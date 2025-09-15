<?php
/**
 * Plugin Name: Next.js Revalidation Plugin
 * Description: Automatically revalidates Next.js cache when posts or pages are updated
 * Version: 1.0.0
 * Author: OptiGrid
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class NextJSRevalidation {
    
    private $nextjs_url;
    private $secret_key;
    private $nextjs_base_url;
    
    public function __construct() {
        // Initialize hooks
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
        
        // Main hook - handles all post and page operations
        add_action('wp_after_insert_post', array($this, 'handle_post_after_insert'), 10, 4);
        
        // Deletion hooks (wp_after_insert_post doesn't cover deletions)
        add_action('delete_post', array($this, 'handle_post_delete'));
        add_action('wp_trash_post', array($this, 'handle_post_delete'));
    }
    
    public function init() {
        $this->nextjs_url = get_option('nextjs_revalidation_url', '');
        $this->secret_key = get_option('nextjs_revalidation_secret', '');
        $this->nextjs_base_url = get_option('nextjs_base_url', '');
    }
    
    
    /**
     * Handle post deletion
     */
    public function handle_post_delete($post_id) {
        $post = get_post($post_id);
        
        if ($post && $post->post_type === 'post') {
            $post_slug = $post->post_name;
            
            // Post deleted - revalidate blogs list and sitemap
            $this->revalidate_tag('blog');
            $this->revalidate_tag('sitemap');
            
            // Warm cache for blogs page (post page will 404)
            $this->warm_cache_pages(array(
                $this->get_page_url($post_slug, 'post'),
                "/blog"
            ));
            
            // Log action
            error_log("NextJS Revalidation: Post deleted - revalidating blogs and sitemap");
        }
    }
    
    
    /**
     * Handle post after all operations are complete
     * This fires after save_post and transition_post_status
     */
    public function handle_post_after_insert($post_id, $post, $update, $post_before) {
        // Handle both posts and pages
        if ($post->post_type !== 'post' && $post->post_type !== 'page') {
            return;
        }

        // Skip autosaves and revisions
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }

        $slug = $post->post_name;
        $current_status = $post->post_status;
        $previous_status = $post_before ? $post_before->post_status : '';

        // Determine what tags to revalidate based on post type and status
        $tags_to_revalidate = array();
        $urls_to_warm = array();

        if ($post->post_type === 'post') {
            // Handle posts
            $tags_to_revalidate[] = $slug;
            $urls_to_warm[] = $this->get_page_url($slug, 'post');

            // If post is or was published, also revalidate blogs and sitemap
            if ($current_status === 'publish' || $previous_status === 'publish') {
                $tags_to_revalidate[] = 'blog';
                $tags_to_revalidate[] = 'sitemap';
                $urls_to_warm[] = '/blog';
            }

            error_log("NextJS Revalidation: Post after insert - {$slug} (status: {$current_status})");
            
        } elseif ($post->post_type === 'page') {
            // Handle pages - only for published pages
            if ($current_status === 'publish') {
                $tags_to_revalidate[] = $slug;
                $urls_to_warm[] = $this->get_page_url($slug, 'page');
            }

            error_log("NextJS Revalidation: Page after insert - {$slug} (status: {$current_status})");
        }

        // Perform revalidation
        foreach ($tags_to_revalidate as $tag) {
            $this->revalidate_tag($tag);
        }

        // Warm cache
        if (!empty($urls_to_warm)) {
            $this->warm_cache_pages($urls_to_warm);
        }
    }

    
    /**
     * Map page slug to the actual URL path
     */
    private function get_page_url($slug, $post_type = 'page') {
        if ($post_type === 'post') {
            return "/blog/{$slug}";
        }
        
        if ($post_type === 'page') {
            // Special mappings for pages
            $page_mappings = array(
                'home' => '/',
                'openbess' => '/products/openbess',
                'optibidder' => '/products/optibidder'
            );
            
            // Return mapped URL or default to /{slug}
            return isset($page_mappings[$slug]) ? $page_mappings[$slug] : "/{$slug}";
        }
        
        return "/{$slug}";
    }
    
    /**
     * Warm up cache for specific pages using multi-cURL
     */
    private function warm_cache_pages($urls) {
        if (empty($this->nextjs_base_url) || empty($urls)) {
            return false;
        }

        $multi_handle = curl_multi_init();
        $curl_handles = array();

        // Create individual cURL handles for each URL
        foreach ($urls as $url) {
            $full_url = rtrim($this->nextjs_base_url, '/') . $url;
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $full_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_USERAGENT, 'WordPress NextJS Cache Warmer');
            curl_setopt($ch, CURLOPT_HEADER, false);
            
            curl_multi_add_handle($multi_handle, $ch);
            $curl_handles[] = $ch;
        }

        // Execute all cURL handles simultaneously
        $running = null;
        do {
            curl_multi_exec($multi_handle, $running);
            curl_multi_select($multi_handle);
        } while ($running > 0);

        // Check results and clean up
        $success_count = 0;
        foreach ($curl_handles as $i => $ch) {
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $url = $urls[$i];
            
            if ($http_code >= 200 && $http_code < 400) {
                $success_count++;
                error_log("NextJS Cache Warmed: {$url} (HTTP {$http_code})");
            } else {
                error_log("NextJS Cache Warm Failed: {$url} (HTTP {$http_code})");
            }
            
            curl_multi_remove_handle($multi_handle, $ch);
            curl_close($ch);
        }

        curl_multi_close($multi_handle);
        
        error_log("NextJS Cache Warming: {$success_count}/" . count($urls) . " pages warmed successfully");
        return $success_count > 0;
    }
    
    /**
     * Make revalidation API call to Next.js
     */
    private function revalidate_tag($tag) {
        if (empty($this->nextjs_url) || empty($this->secret_key)) {
            error_log('NextJS Revalidation: URL or secret key not configured');
            return false;
        }
        
        $url = add_query_arg(array(
            'tag' => $tag,
            'secret' => $this->secret_key
        ), $this->nextjs_url);
        
        $response = wp_remote_get($url, array(
            'timeout' => 10,
            'headers' => array(
                'User-Agent' => 'WordPress NextJS Revalidation Plugin'
            )
        ));
        
        if (is_wp_error($response)) {
            error_log('NextJS Revalidation Error: ' . $response->get_error_message());
            return false;
        }
        
        $response_code = wp_remote_retrieve_response_code($response);
        $response_body = wp_remote_retrieve_body($response);
        
        if ($response_code === 200) {
            error_log("NextJS Revalidation Success: Tag '{$tag}' revalidated");
            return true;
        } else {
            error_log("NextJS Revalidation Failed: HTTP {$response_code} - {$response_body}");
            return false;
        }
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            'Next.js Revalidation Settings',
            'Next.js Revalidation',
            'manage_options',
            'nextjs-revalidation',
            array($this, 'options_page')
        );
    }
    
    /**
     * Initialize settings
     */
    public function settings_init() {
        register_setting('nextjs_revalidation', 'nextjs_revalidation_url');
        register_setting('nextjs_revalidation', 'nextjs_revalidation_secret');
        register_setting('nextjs_revalidation', 'nextjs_base_url');
        
        add_settings_section(
            'nextjs_revalidation_section',
            'Next.js Configuration',
            array($this, 'settings_section_callback'),
            'nextjs_revalidation'
        );
        
        add_settings_field(
            'nextjs_revalidation_url',
            'Next.js Revalidation URL',
            array($this, 'url_render'),
            'nextjs_revalidation',
            'nextjs_revalidation_section'
        );
        
        add_settings_field(
            'nextjs_revalidation_secret',
            'Secret Key',
            array($this, 'secret_render'),
            'nextjs_revalidation',
            'nextjs_revalidation_section'
        );
        
        add_settings_field(
            'nextjs_base_url',
            'Next.js Site URL',
            array($this, 'base_url_render'),
            'nextjs_revalidation',
            'nextjs_revalidation_section'
        );
    }
    
    public function url_render() {
        $url = get_option('nextjs_revalidation_url');
        echo '<input type="url" name="nextjs_revalidation_url" value="' . esc_attr($url) . '" size="50" placeholder="https://your-nextjs-site.com/api/revalidate" />';
        echo '<p class="description">Full URL to your Next.js revalidation endpoint</p>';
    }
    
    public function secret_render() {
        $secret = get_option('nextjs_revalidation_secret');
        echo '<input type="password" name="nextjs_revalidation_secret" value="' . esc_attr($secret) . '" size="50" />';
        echo '<p class="description">Secret key for authenticating revalidation requests</p>';
    }
    
    public function base_url_render() {
        $base_url = get_option('nextjs_base_url');
        echo '<input type="url" name="nextjs_base_url" value="' . esc_attr($base_url) . '" size="50" placeholder="https://your-nextjs-site.com" />';
        echo '<p class="description">Base URL of your Next.js site for cache warming (without trailing slash)</p>';
    }
    
    public function settings_section_callback() {
        echo '<p>Configure your Next.js revalidation settings below.</p>';
    }
    
    /**
     * Admin options page
     */
    public function options_page() {
        ?>
        <div class="wrap">
            <h1>Next.js Revalidation Settings</h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('nextjs_revalidation');
                do_settings_sections('nextjs_revalidation');
                submit_button();
                ?>
            </form>
            
            <hr>
            
            <h2>Manual Revalidation</h2>
            <p>Test your revalidation setup:</p>
            
            <form method="post" action="">
                <?php wp_nonce_field('manual_revalidation', 'revalidation_nonce'); ?>
                <p>
                    <label for="manual_tag">Tag to revalidate:</label>
                    <input type="text" id="manual_tag" name="manual_tag" placeholder="blogs" />
                    <input type="submit" name="manual_revalidate" class="button" value="Test Revalidation" />
                </p>
                <p>
                    <input type="submit" name="clear_all_cache" class="button button-secondary" value="Clear All Cache" onclick="return confirm('Are you sure you want to clear all cache? This will revalidate everything.');" />
                </p>
            </form>
            
            <?php
            // Handle manual revalidation
            if (isset($_POST['manual_revalidate']) && wp_verify_nonce($_POST['revalidation_nonce'], 'manual_revalidation')) {
                $tag = sanitize_text_field($_POST['manual_tag']);
                if (!empty($tag)) {
                    $result = $this->revalidate_tag($tag);
                    if ($result) {
                        echo '<div class="notice notice-success"><p>Revalidation successful for tag: ' . esc_html($tag) . '</p></div>';
                    } else {
                        echo '<div class="notice notice-error"><p>Revalidation failed for tag: ' . esc_html($tag) . '</p></div>';
                    }
                }
            }
            
            // Handle clear all cache
            if (isset($_POST['clear_all_cache']) && wp_verify_nonce($_POST['revalidation_nonce'], 'manual_revalidation')) {
                $result = $this->revalidate_tag('all');
                if ($result) {
                    echo '<div class="notice notice-success"><p>All cache cleared successfully!</p></div>';
                } else {
                    echo '<div class="notice notice-error"><p>Failed to clear all cache. Please check your settings.</p></div>';
                }
            }
            ?>
        </div>
        <?php
    }
}

// Initialize the plugin
new NextJSRevalidation();
