const {defineConfig} = require('cypress');

module.exports = defineConfig({
  env: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  },
  video:true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});