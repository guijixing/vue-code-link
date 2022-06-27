const openCodeServer = require('./server')
const openCodeClient = require('./client')
const addCodeLocation = require('./add-location-loader')
const addCodeLocationConfig = require('./add-location-loader/config.js')
module.exports = {
  openCodeClient: openCodeClient,
  openCodeServer: openCodeServer,
  addCodeLocation: addCodeLocation,
  addCodeLocationConfig: addCodeLocationConfig,
}
