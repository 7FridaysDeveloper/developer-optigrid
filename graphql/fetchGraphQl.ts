// GraphQL client for WordPress
export interface GraphQLResponse<T = any> {
    data?: T;
    errors?: Array<{
        message: string;
        locations?: Array<{
            line: number;
            column: number;
        }>;
        path?: string[];
    }>;
}

export interface GraphQLVariables {
    [key: string]: any;
}

/**
 * Execute GraphQL query to WordPress
 */
export async function fetchGraphQl<T = any>(
    query: string,
    variables: GraphQLVariables = {},
    tags: string[] = [],
    /**
     * Unique key for caching this request.
     *
     * Next.js caches POST requests by URL, not by the request body.
     * So even if `query` or `variables` change, without a unique key all requests would be considered the same cache entry.
     *
     * `key` is added to the URL (for example, as a query string) to ensure that each unique combination of query + variables has its own cache.
     */
    key: string
): Promise<T> {


    const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;

    if (!WORDPRESS_GRAPHQL_URL) {
        throw new Error('WORDPRESS_GRAPHQL_URL environment variable is not set');
    }

    const response = await fetch(`${WORDPRESS_GRAPHQL_URL}?key=${key}` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add authorization if needed
            ...(process.env.WORDPRESS_AUTH_TOKEN && {
                'Authorization': `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}`
            }),
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        // Caching configuration
        next: {
            revalidate: 3600,
            tags: ['all', ...tags]
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors && json.errors.length > 0) {
        throw new Error(`GraphQL error: ${json.errors.map(e => e.message).join(', ')}`);
    }

    if (!json.data) {
        throw new Error('No data returned from GraphQL query');
    }
    return json.data;
}
