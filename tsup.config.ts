import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/hooks/index.ts',
    'src/performance/index.ts',
    'src/api/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
});
