import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/shared/infra/http/server.ts'],
  outDir: 'dist',
  format: ['cjs'],
  splitting: false,
  clean: true,
  sourcemap: true,
  noExternal: [/@modules/, /@config/, /@shared/],
});
