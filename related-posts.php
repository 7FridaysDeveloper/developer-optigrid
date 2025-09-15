<?php
/**
 * Plugin Name: Related Posts GraphQL
 * Description: Adds relatedPosts field to WordPress GraphQL for posts
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class RelatedPostsGraphQL {

    public function __construct() {
        add_action('graphql_register_types', [$this, 'register_related_posts_field']);
    }

    /**
     * Register the relatedPosts field in GraphQL
     */
    public function register_related_posts_field() {
        register_graphql_field('Post', 'relatedPosts', [
            'type' => ['list_of' => 'Post'],
            'description' => __('Related posts based on categories and tags', 'related-posts-graphql'),
            'args' => [
                'first' => [
                    'type' => 'Int',
                    'description' => __('Number of related posts to return', 'related-posts-graphql'),
                    'defaultValue' => 3,
                ],
            ],
            'resolve' => function($post, $args, $context, $info) {
                $related_ids = $this->get_related_post_ids($post->ID, $args['first']);

                if (empty($related_ids)) {
                    return [];
                }

                $posts = [];
                foreach ($related_ids as $post_id) {
                    $loaded_post = $context->get_loader('post')->load_deferred($post_id);
                    if ($loaded_post) {
                        $posts[] = $loaded_post;
                    }
                }

                return $posts;
            }
        ]);
    }

    /**
     * Get related post IDs
     */
    private function get_related_post_ids($post_id, $limit = 3) {
        // Get current post's categories and tags
        $categories = wp_get_post_categories($post_id);
        $tags = wp_get_post_tags($post_id, ['fields' => 'ids']);

        // Build query arguments
        $args = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'posts_per_page' => $limit,
            'post__not_in' => [$post_id],
            'fields' => 'ids', // Тільки ID
            'orderby' => 'date',
            'order' => 'DESC',
        ];

        // Add tax_query if we have categories or tags
        if (!empty($categories) || !empty($tags)) {
            $tax_query = ['relation' => 'OR'];

            if (!empty($categories)) {
                $tax_query[] = [
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => $categories,
                ];
            }

            if (!empty($tags)) {
                $tax_query[] = [
                    'taxonomy' => 'post_tag',
                    'field' => 'term_id',
                    'terms' => $tags,
                ];
            }

            $args['tax_query'] = $tax_query;
        }

        // Get related post IDs
        $related_query = new WP_Query($args);
        $related_ids = $related_query->posts;

        // Reset post data
        wp_reset_postdata();

        // If we don't have enough related posts, get random posts
        if (count($related_ids) < $limit) {
            $remaining = $limit - count($related_ids);
            $exclude_ids = array_merge([$post_id], $related_ids);

            $random_args = [
                'post_type' => 'post',
                'post_status' => 'publish',
                'posts_per_page' => $remaining,
                'post__not_in' => $exclude_ids,
                'fields' => 'ids',
                'orderby' => 'rand',
            ];

            $random_query = new WP_Query($random_args);
            $random_ids = $random_query->posts;
            $related_ids = array_merge($related_ids, $random_ids);

            // Reset post data
            wp_reset_postdata();
        }

        return array_map('intval', $related_ids);
    }
}

// Initialize the plugin
new RelatedPostsGraphQL();