'use strict';

var react = require('react');

// src/hooks/index.ts
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = react.useState(false);
  const ref = react.useRef(null);
  react.useEffect(() => {
    if (typeof window === "undefined") return;
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
  const callback = react.useCallback(effect, deps);
  react.useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}
function usePersistentState(key, initialValue) {
  const [state, setState] = react.useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  react.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);
  return [state, setState];
}

exports.useDebounceEffect = useDebounceEffect;
exports.useIntersectionObserver = useIntersectionObserver;
exports.usePersistentState = usePersistentState;
