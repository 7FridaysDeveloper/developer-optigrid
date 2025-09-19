export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    endpoints: {
      contact: "/api/contact/",
      newsletter: "/api/newsletter/subscribe/",
    },
  },
} as const;

export const getApiUrl = (endpoint: string) => {
  return `${config.api.baseUrl}${endpoint}`;
};
