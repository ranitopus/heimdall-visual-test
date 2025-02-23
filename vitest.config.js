import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    reporters: ['verbose'],
    include: ['src/**/*.test.js'],
    /**
     * Environment configurations to enable external resource loading for tests,
     * such as real image loading from URLs, for example. based on:
     * - https://stackoverflow.com/questions/39942115/testing-image-onload-using-jsdom-sinon-mocha-and-chai
     * - https://github.com/jsdom/jsdom?tab=readme-ov-file#loading-subresources
     * - https://vitest.dev/config/#environmentoptions
     */
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
