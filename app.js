// Required: 
const express = require("express");
const app = express();
const config = require("config");
const RoutesSettings = require("./startup/RoutesSettings");
const mainErrorHandler = require("./startup/mainErrorHandler");
const routes = require("./startup/routes");

// Init Routes Settings: 
RoutesSettings(app);
app.use(config.get("settings.apis_prefix"), routes);


// Error Handeler (Any error will be populated to this function then send the resposne):
mainErrorHandler(app);

module.exports = app;