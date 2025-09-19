
export function getWordPressBaseUrl(graphqlUrl?: string): string {
    if (!graphqlUrl) {
        throw new Error('WordPress GraphQL URL is not configured');
    }

    return graphqlUrl.replace('/graphql', '');
}

export function buildGravityFormsEndpoint(formId: number, graphqlUrl?: string): string {
    const baseUrl = getWordPressBaseUrl(graphqlUrl || process.env.WORDPRESS_GRAPHQL_URL);
    return `${baseUrl}/wp-json/gf/v2/forms/${formId}/submissions`;
}


export function buildWordPressRestEndpoint(endpoint: string, graphqlUrl?: string): string {
    const baseUrl = getWordPressBaseUrl(graphqlUrl || process.env.WORDPRESS_GRAPHQL_URL);
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${baseUrl}/wp-json/${cleanEndpoint}`;
}


export function createWordPressAuthHeader(username: string, password: string): string {
    return Buffer.from(`${username}:${password}`).toString('base64');
}
