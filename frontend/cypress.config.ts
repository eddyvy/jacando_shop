import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: 'test/fixtures',
  screenshotsFolder: 'test/screenshots',
  videosFolder: 'test/videos',
  downloadsFolder: 'test/downloads',
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  e2e: {
    specPattern: 'test/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/support/index.ts',
    baseUrl: 'http://localhost',
  },
})
