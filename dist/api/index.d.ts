interface APIClientConfig {
    baseURL: string;
    validateResponses?: boolean;
    headers?: Record<string, string>;
}
interface APIResponse<T> {
    data: T;
    status: number;
    headers: Headers;
}
declare class APIError extends Error {
    status: number;
    statusText: string;
    data: any;
    constructor(status: number, statusText: string, data: any);
}
declare class APIClient {
    private config;
    private cache;
    constructor(config: APIClientConfig);
    private handleResponse;
    get<T>(path: string, options?: {
        cache?: boolean;
        cacheDuration?: number;
        headers?: Record<string, string>;
    }): Promise<T>;
    post<T>(path: string, body: any, options?: {
        headers?: Record<string, string>;
    }): Promise<T>;
}

export { APIClient, type APIClientConfig, APIError, type APIResponse };
