import React from 'react';

interface MemoizeOptions {
    propsToWatch?: string[];
    maxCacheSize?: number;
}
declare function memoizeComponent<P extends object>(Component: React.ComponentType<P>, options?: MemoizeOptions): React.MemoExoticComponent<React.ComponentType<P>>;
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
    } | null;
}

export { type MemoizeOptions, PerformanceMonitor, memoizeComponent, prefetchResources };
