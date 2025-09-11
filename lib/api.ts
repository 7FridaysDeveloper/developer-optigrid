import { config, getApiUrl } from "./config";
import type { ContactFormData } from "./schemas";

export interface NewsletterSubscriptionData {
  email: string;
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  status?: string;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiClient = {
  async post<T = unknown>(
    endpoint: string,
    data: unknown,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    try {
      const url = getApiUrl(endpoint);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          response,
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  },

  async get<T = unknown>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    try {
      const url = getApiUrl(endpoint);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          response,
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  },
};

// Specific API functions
export const contactApi = {
  submit: (data: ContactFormData) =>
    apiClient.post<{ id: string; status: string; message: string }>(
      config.api.endpoints.contact,
      data,
    ),
};

export const newsletterApi = {
  subscribe: (data: NewsletterSubscriptionData) =>
    apiClient.post<{ status?: string; success?: boolean; message?: string }>(
      config.api.endpoints.newsletter,
      data,
    ),
};
