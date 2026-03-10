const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yxpa2k',
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 120000,
  },
});
