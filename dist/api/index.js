'use strict';

// src/api/index.ts
var APIError = class extends Error {
  constructor(status, statusText, data) {
    super(`API Error: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.name = "APIError";
  }
};
var APIClient = class {
  constructor(config) {
    this.config = {
      validateResponses: true,
      ...config
    };
    this.cache = /* @__PURE__ */ new Map();
  }
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new APIError(response.status, response.statusText, errorData);
    }
    const data = await response.json();
    if (this.config.validateResponses) ;
    return {
      data,
      status: response.status,
      headers: response.headers
    };
  }
  async get(path, options = {}) {
    const url = `${this.config.baseURL}${path}`;
    const cacheKey = `GET:${url}`;
    if (options.cache) {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < (options.cacheDuration || 5e3)) {
        return cached.data;
      }
    }
    const response = await fetch(url, {
      headers: {
        ...this.config.headers,
        ...options.headers
      }
    });
    const { data } = await this.handleResponse(response);
    if (options.cache) {
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }
    return data;
  }
  async post(path, body, options = {}) {
    const url = `${this.config.baseURL}${path}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers,
        ...options.headers
      },
      body: JSON.stringify(body)
    });
    const { data } = await this.handleResponse(response);
    return data;
  }
};

exports.APIClient = APIClient;
exports.APIError = APIError;
