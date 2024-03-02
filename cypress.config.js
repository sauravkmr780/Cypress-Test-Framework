const { defineConfig } = require("cypress");


module.exports = defineConfig({

  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: "cypress/Reports",
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportFilename: "Orange Cypress Test Report",
      reportPageTitle: 'Cypess-Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
