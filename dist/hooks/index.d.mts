interface IntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    root?: Element | null;
}
declare function useIntersectionObserver(options?: IntersectionObserverOptions): [React.RefObject<any>, boolean];
declare function useDebounceEffect(effect: () => void, deps: any[], delay: number): void;
declare function usePersistentState<T>(key: string, initialValue: T): [T, (value: T) => void];

export { type IntersectionObserverOptions, useDebounceEffect, useIntersectionObserver, usePersistentState };
