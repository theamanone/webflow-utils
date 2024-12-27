'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

// src/hooks.ts
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.root, options.rootMargin]);
  return [ref, isVisible];
}
function useDebounceEffect(effect, deps, delay) {
  const callback = React.useCallback(effect, deps);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}
function usePersistentState(key, initialValue) {
  const [state, setState] = React.useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);
  return [state, setState];
}
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
    const average = measurements.reduce((a, b) => a + b, 0) / measurements.length;
    return {
      average,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      count: measurements.length
    };
  }
};

// src/api.ts
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
  // Add other methods (PUT, DELETE, etc.) as needed
};

// src/index.ts
var VERSION = "0.1.0";
var PACKAGE_NAME = "webflow-utils";

exports.APIClient = APIClient;
exports.APIError = APIError;
exports.PACKAGE_NAME = PACKAGE_NAME;
exports.PerformanceMonitor = PerformanceMonitor;
exports.VERSION = VERSION;
exports.memoizeComponent = memoizeComponent;
exports.prefetchResources = prefetchResources;
exports.useDebounceEffect = useDebounceEffect;
exports.useIntersectionObserver = useIntersectionObserver;
exports.usePersistentState = usePersistentState;
