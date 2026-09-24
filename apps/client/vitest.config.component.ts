import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./src/test/component/*'],
    setupFiles: ['./src/test/setup.ts'],
  },
});
