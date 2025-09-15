// GraphQL queries and types for SEO data

// SEO Types
export interface SEOBreadcrumb {
  text: string;
  url: string;
}

export interface SEOImage {
  altText?: string;
  sourceUrl: string;
  srcSet?: string;
}

export interface DetailedSEO {
  canonical?: string;
  cornerstone?: boolean;
  breadcrumbs?: SEOBreadcrumb[];
  metaDesc?: string;
  metaRobotsNofollow?: string;
  metaRobotsNoindex?: string;
  opengraphDescription?: string;
  opengraphAuthor?: string;
  opengraphImage?: SEOImage;
  twitterDescription?: string;
  title?: string;
  twitterImage?: SEOImage;
  metaKeywords?: string;
  focuskw?: string;
}

export interface PostSEOData {
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  modified: string;
  seo?: DetailedSEO;
}

export interface PageSEOData {
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  date: string;
  modified: string;
  seo?: DetailedSEO;
}

export interface GeneralSettings {
  description?: string;
  title?: string;
  url?: string;
  language?: string;
  startOfWeek?: number;
  timeFormat?: string;
  timezone?: string;
  dateFormat?: string;
}

export interface PostSEOResponse {
  postBy: PostSEOData | null;
  generalSettings: GeneralSettings;
}

export interface PageSEOResponse {
  pageBy: PageSEOData | null;
  generalSettings: GeneralSettings;
}

export interface GeneralSettingsResponse {
  generalSettings: GeneralSettings;
}

// SEO Queries
export const GET_POST_SEO_QUERY = `
  query GetPostSEO($slug: String!) {
    postBy(slug: $slug) {
      databaseId
      title
      slug
      excerpt
      date
      modified
      seo {
        canonical
        cornerstone
        breadcrumbs {
          text
          url
        }
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphDescription
        opengraphAuthor
        opengraphImage {
          altText
          sourceUrl
        }
        twitterDescription
        title
        twitterImage {
          altText
          srcSet
        }
        metaKeywords
        focuskw
      }
    }
    generalSettings {
      description
      title
    }
  }
`;

export const GET_PAGE_SEO_QUERY = `
  query GetPageSEO($slug: String!) {
    pageBy(uri: $slug) {
      databaseId
      title
      slug
      content
      date
      modified
      seo {
        canonical
        cornerstone
        breadcrumbs {
          text
          url
        }
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphDescription
        opengraphAuthor
        opengraphImage {
          altText
          sourceUrl
        }
        twitterDescription
        title
        twitterImage {
          altText
          srcSet
        }
        metaKeywords
        focuskw
      }
    }
    generalSettings {
      description
      title
    }
  }
`;

export const GET_GENERAL_SETTINGS_QUERY = `
  query GetGeneralSettings {
    generalSettings {
      title
      description
      url
      language
      startOfWeek
      timeFormat
      timezone
      dateFormat
    }
  }
`;
