import React$1 from 'react';

interface IntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    root?: Element | null;
}
declare function useIntersectionObserver(options?: IntersectionObserverOptions): [React.RefObject<any>, boolean];
declare function useDebounceEffect(effect: () => void, deps: any[], delay: number): void;
declare function usePersistentState<T>(key: string, initialValue: T): [T, (value: T) => void];

interface MemoizeOptions {
    propsToWatch?: string[];
    maxCacheSize?: number;
}
declare function memoizeComponent<P extends object>(Component: React$1.ComponentType<P>, options?: MemoizeOptions): React$1.MemoExoticComponent<React$1.ComponentType<P>>;
declare function prefetchResources(urls: string[]): Promise<void[]>;
declare class PerformanceMonitor {
    private static instance;
    private metrics;
    private constructor();
    static getInstance(): PerformanceMonitor;
    startMeasure(label: string): () => void;
    getMetrics(label: string): {
        average: number;
        min: number;
        max: number;
        count: number;
    };
}

interface APIClientConfig {
    baseURL: string;
    validateResponses?: boolean;
    headers?: Record<string, string>;
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

declare const VERSION = "0.1.0";
declare const PACKAGE_NAME = "webflow-utils";

export { APIClient, APIError, type IntersectionObserverOptions, type MemoizeOptions, PACKAGE_NAME, PerformanceMonitor, VERSION, memoizeComponent, prefetchResources, useDebounceEffect, useIntersectionObserver, usePersistentState };
