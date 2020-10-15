// Main Require: 
const express = require("express");
const app = express();
const config = require("config");
// Routes Settings:
const RoutesSettings = require("./startup/RoutesSettings");
const routes = require("./startup/routes");

// Init Routes Settings: 
RoutesSettings(app);
app.use(config.get("settings.apis_prefix"), routes);


module.exports = app;