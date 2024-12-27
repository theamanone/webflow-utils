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

export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: any
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'APIError';
  }
}

export class APIClient {
  private config: APIClientConfig;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor(config: APIClientConfig) {
    this.config = {
      validateResponses: true,
      ...config,
    };
    this.cache = new Map();
  }

  private async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new APIError(response.status, response.statusText, errorData);
    }

    const data = await response.json();
    
    if (this.config.validateResponses) {
      // Add your validation logic here
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  }

  async get<T>(
    path: string,
    options: {
      cache?: boolean;
      cacheDuration?: number;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${path}`;
    const cacheKey = `GET:${url}`;

    // Check cache
    if (options.cache) {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < (options.cacheDuration || 5000)) {
        return cached.data;
      }
    }

    const response = await fetch(url, {
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    });

    const { data } = await this.handleResponse<T>(response);

    // Update cache
    if (options.cache) {
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    }

    return data;
  }

  async post<T>(
    path: string,
    body: any,
    options: { headers?: Record<string, string> } = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...options.headers,
      },
      body: JSON.stringify(body),
    });

    const { data } = await this.handleResponse<T>(response);
    return data;
  }

  // Add other methods (PUT, DELETE, etc.) as needed
}
