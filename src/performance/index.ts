import React from 'react';

export interface MemoizeOptions {
  propsToWatch?: string[];
  maxCacheSize?: number;
}

export function memoizeComponent<P extends object>(
  Component: React.ComponentType<P>,
  options: MemoizeOptions = {}
): React.MemoExoticComponent<React.ComponentType<P>> {
  const { propsToWatch } = options;

  return React.memo(Component, (prevProps: P, nextProps: P) => {
    if (!propsToWatch) {
      return false;
    }

    return propsToWatch.every(
      (prop) => prevProps[prop as keyof P] === nextProps[prop as keyof P]
    );
  });
}

export function prefetchResources(urls: string[]): Promise<void[]> {
  if (typeof window === 'undefined') return Promise.resolve([]);
  
  return Promise.all(
    urls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.onload = () => resolve();
        link.onerror = reject;
        document.head.appendChild(link);
      });
    })
  );
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]>;

  private constructor() {
    this.metrics = new Map();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(label: string): () => void {
    if (typeof window === 'undefined') return () => {};
    
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = end - start;
      
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      this.metrics.get(label)!.push(duration);
    };
  }

  getMetrics(label: string) {
    const measurements = this.metrics.get(label) || [];
    if (measurements.length === 0) return null;
    
    const average = measurements.reduce((a, b) => a + b, 0) / measurements.length;
    
    return {
      average,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      count: measurements.length
    };
  }
}
