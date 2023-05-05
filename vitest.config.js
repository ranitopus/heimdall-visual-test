import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    reporters: ['verbose'],
    include: ['src/**/*.test.js'],
  },
})