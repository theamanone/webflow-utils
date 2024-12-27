'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

// src/performance/index.ts
function memoizeComponent(Component, options = {}) {
  const { propsToWatch } = options;
  return React__default.default.memo(Component, (prevProps, nextProps) => {
    if (!propsToWatch) {
      return false;
    }
    return propsToWatch.every(
      (prop) => prevProps[prop] === nextProps[prop]
    );
  });
}
function prefetchResources(urls) {
  if (typeof window === "undefined") return Promise.resolve([]);
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        link.onload = () => resolve();
        link.onerror = reject;
        document.head.appendChild(link);
      });
    })
  );
}
var PerformanceMonitor = class _PerformanceMonitor {
  constructor() {
    this.metrics = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    if (!_PerformanceMonitor.instance) {
      _PerformanceMonitor.instance = new _PerformanceMonitor();
    }
    return _PerformanceMonitor.instance;
  }
  startMeasure(label) {
    if (typeof window === "undefined") return () => {
    };
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = end - start;
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      this.metrics.get(label).push(duration);
    };
  }
  getMetrics(label) {
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
};

exports.PerformanceMonitor = PerformanceMonitor;
exports.memoizeComponent = memoizeComponent;
exports.prefetchResources = prefetchResources;
