// GraphQL queries for fetching post by ID

import { WordPressPostBase, WordPressRelatedPost } from '@/graphql/types/types';

/**
 * WordPress post by ID with related posts
 */
export interface WordPressPostById extends WordPressPostBase {
  relatedPosts?: WordPressRelatedPost[];
}

/**
 * WordPress post by ID without related posts - used for optimization
 */
export type WordPressPostByIdSimple = Omit<WordPressPostById, 'relatedPosts'>;

export const GET_POST_BY_ID_QUERY = `
  query GetPostById($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
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

export const GET_POST_BY_ID_SIMPLE_QUERY = `
  query GetPostByIdSimple($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
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
`;
