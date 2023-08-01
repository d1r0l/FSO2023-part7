/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000'
  },
  env: {
    server_api_url: 'http://localhost:3001/api'
  }
})
