// GraphQL queries for fetching multiple posts

import { WordPressPostBase } from '@/graphql/types/types';

/**
 * WordPress post for list view - uses base interface without content field
 */
export type WordPressPostList = Omit<WordPressPostBase, 'content'>;

export const GET_ALL_POSTS_QUERY = `
  query GetAllPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        databaseId
        title
        slug
        excerpt
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
