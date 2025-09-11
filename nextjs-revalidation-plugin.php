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
    
    public function __construct() {
        // Initialize hooks
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
        
        // Post hooks
        add_action('save_post', array($this, 'handle_post_save'), 10, 3);
        add_action('delete_post', array($this, 'handle_post_delete'));
        add_action('wp_trash_post', array($this, 'handle_post_delete'));
        add_action('untrash_post', array($this, 'handle_post_untrash'));
        
        // Page hooks
        add_action('save_post_page', array($this, 'handle_page_save'), 10, 3);
        
        // Comment hooks (optional)
        add_action('comment_post', array($this, 'handle_comment_change'));
        add_action('edit_comment', array($this, 'handle_comment_change'));
        add_action('delete_comment', array($this, 'handle_comment_change'));
    }
    
    public function init() {
        $this->nextjs_url = get_option('nextjs_revalidation_url', '');
        $this->secret_key = get_option('nextjs_revalidation_secret', '');
    }
    
    /**
     * Handle post save/update
     */
    public function handle_post_save($post_id, $post, $update) {
        // Skip autosaves and revisions
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }
        
        // Only handle published posts
        if ($post->post_status !== 'publish') {
            return;
        }
        
        // Only handle posts (not pages or other post types)
        if ($post->post_type !== 'post') {
            return;
        }
        
        $post_slug = $post->post_name;
        
        if ($update) {
            // Post updated - revalidate specific post, blogs list, and sitemap
            $this->revalidate_tag($post_slug);
            $this->revalidate_tag('blogs');
            $this->revalidate_tag('sitemap');
            
            // Log action
            error_log("NextJS Revalidation: Post updated - {$post_slug}");
        } else {
            // New post created - revalidate blogs list and sitemap
            $this->revalidate_tag('blogs');
            $this->revalidate_tag('sitemap');
            
            // Log action
            error_log("NextJS Revalidation: New post created - revalidating blogs and sitemap");
        }
    }
    
    /**
     * Handle page save/update
     */
    public function handle_page_save($post_id, $post, $update) {
        // Skip autosaves and revisions
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }
        
        // Only handle published pages
        if ($post->post_status !== 'publish') {
            return;
        }
        
        $page_slug = $post->post_name;
        
        // Revalidate specific page
        $this->revalidate_tag($page_slug);
        
        // Log action
        error_log("NextJS Revalidation: Page updated - {$page_slug}");
    }
    
    /**
     * Handle post deletion
     */
    public function handle_post_delete($post_id) {
        $post = get_post($post_id);
        
        if ($post && $post->post_type === 'post') {
            // Post deleted - revalidate blogs list and sitemap
            $this->revalidate_tag('blogs');
            $this->revalidate_tag('sitemap');
            
            // Log action
            error_log("NextJS Revalidation: Post deleted - revalidating blogs and sitemap");
        }
    }
    
    /**
     * Handle post untrash
     */
    public function handle_post_untrash($post_id) {
        $post = get_post($post_id);
        
        if ($post && $post->post_type === 'post' && $post->post_status === 'publish') {
            $post_slug = $post->post_name;
            
            // Post restored - revalidate specific post, blogs list, and sitemap
            $this->revalidate_tag($post_slug);
            $this->revalidate_tag('blogs');
            $this->revalidate_tag('sitemap');
            
            // Log action
            error_log("NextJS Revalidation: Post restored - {$post_slug}");
        }
    }
    
    /**
     * Handle comment changes
     */
    public function handle_comment_change($comment_id) {
        $comment = get_comment($comment_id);
        
        if ($comment) {
            $post = get_post($comment->comment_post_ID);
            
            if ($post && $post->post_type === 'post') {
                $post_slug = $post->post_name;
                
                // Comment changed - revalidate specific post
                $this->revalidate_tag($post_slug);
                
                // Log action
                error_log("NextJS Revalidation: Comment changed for post - {$post_slug}");
            }
        }
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
