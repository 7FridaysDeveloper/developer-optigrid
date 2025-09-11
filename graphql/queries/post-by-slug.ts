// GraphQL queries for fetching post by slug

import { WordPressPostBase, WordPressRelatedPost } from '@/graphql/types/types';

/**
 * WordPress post by slug with related posts
 */
export interface WordPressPostBySlug extends WordPressPostBase {
  relatedPosts?: WordPressRelatedPost[];
}

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      databaseId
      title
      slug
      excerpt
      content
      date
      modified
      status
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          id
          name
          description
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      relatedPosts {
          databaseId
          title
          slug
          excerpt
          content
          date
          modified
          status
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          author {
            node {
              id
              name
              description
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
          tags {
            nodes {
              id
              name
              slug
            }
          }
      }
    }
  }
`;
