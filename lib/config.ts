export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    endpoints: {
      contact: "/contact/",
      newsletter: "/newsletter/subscribe",
    },
  },
} as const;

export const getApiUrl = (endpoint: string) => {
  return `${config.api.baseUrl}${endpoint}`;
};
