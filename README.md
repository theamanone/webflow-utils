# webflow-utils 🚀

A powerful utility library for modern web development, designed to solve common challenges in React, Next.js, and Node.js applications. Built with TypeScript for type safety and optimized for modern web development workflows.

[![npm version](https://badge.fury.io/js/webflow-utils.svg)](https://badge.fury.io/js/webflow-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features 🌟

- 🎣 **React Hooks**
  - `useIntersectionObserver` - Efficient lazy loading and scroll animations
  - `useDebounceEffect` - Performance-optimized effect handling
  - `usePersistentState` - Persistent state with localStorage

- 🚀 **Performance Utilities**
  - Smart component memoization
  - Resource prefetching
  - Performance monitoring and metrics

- 🔄 **API Client**
  - Type-safe requests
  - Built-in caching
  - Error handling
  - Response validation

## Installation 📦

```bash
npm install webflow-utils
# or
yarn add webflow-utils
# or
pnpm add webflow-utils
```

## Usage Examples 💡

### React Hooks

#### useIntersectionObserver
Perfect for lazy loading images or implementing infinite scroll:

```tsx
import { useIntersectionObserver } from 'webflow-utils';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <div ref={ref}>
      {isVisible && <img src={src} alt={alt} />}
    </div>
  );
}
```

#### usePersistentState
Persist state across page reloads:

```tsx
import { usePersistentState } from 'webflow-utils';

function ThemeToggle() {
  const [theme, setTheme] = usePersistentState('app-theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

#### useDebounceEffect
Optimize expensive operations:

```tsx
import { useDebounceEffect } from 'webflow-utils';

function SearchComponent() {
  const [query, setQuery] = useState('');

  useDebounceEffect(() => {
    // This will only run 500ms after the last query change
    searchAPI(query);
  }, [query], 500);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### Performance Utilities

#### Component Memoization
Optimize re-renders with smart memoization:

```tsx
import { memoizeComponent } from 'webflow-utils';

interface CardProps {
  title: string;
  content: string;
  timestamp: number;
}

const Card = ({ title, content, timestamp }: CardProps) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
    <time>{new Date(timestamp).toLocaleDateString()}</time>
  </div>
);

// Only re-render when title or content changes, ignore timestamp updates
const MemoizedCard = memoizeComponent(Card, {
  propsToWatch: ['title', 'content']
});
```

#### Performance Monitoring
Track performance metrics in your app:

```tsx
import { PerformanceMonitor } from 'webflow-utils';

function ExpensiveComponent() {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    const endMeasure = monitor.startMeasure('expensive-operation');

    // Your expensive operation here
    performExpensiveTask();

    endMeasure();

    // Get metrics
    const metrics = monitor.getMetrics('expensive-operation');
    console.log('Performance metrics:', metrics);
  }, []);

  return <div>...</div>;
}
```

### API Client

#### Type-Safe API Requests
Make type-safe API calls with built-in caching:

```tsx
import { APIClient } from 'webflow-utils';

interface User {
  id: number;
  name: string;
  email: string;
}

const api = new APIClient({
  baseURL: 'https://api.example.com',
  validateResponses: true,
});

// Get users with type safety
async function getUsers() {
  try {
    const users = await api.get<User[]>('/users', {
      cache: true,
      cacheDuration: 5000, // 5 seconds
    });
    return users;
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error: ${error.status} - ${error.message}`);
    }
    throw error;
  }
}
```

## TypeScript Support 📘

`webflow-utils` is written in TypeScript and includes type definitions out of the box. No additional `@types` packages are needed.

## Best Practices 🎯

1. **Import Only What You Need**
   ```tsx
   // Good - tree-shakeable
   import { useIntersectionObserver } from 'webflow-utils/hooks';
   
   // Also good - specific imports
   import { APIClient } from 'webflow-utils/api';
   ```

2. **Use Performance Monitoring**
   ```tsx
   const monitor = PerformanceMonitor.getInstance();
   
   // Wrap critical sections
   const endMeasure = monitor.startMeasure('critical-section');
   // ... your code ...
   endMeasure();
   ```

3. **Optimize API Calls**
   ```tsx
   const api = new APIClient({
     baseURL: '/api',
     validateResponses: true,
   });

   // Use caching for frequently accessed data
   const data = await api.get('/frequent-data', {
     cache: true,
     cacheDuration: 60000, // 1 minute
   });
   ```

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support ⭐

If you find this package helpful, please star the repository to help others discover it!

## Changelog 📝

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and improvements.
#   w e b f l o w - u t i l s  
 