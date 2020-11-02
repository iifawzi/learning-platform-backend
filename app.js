// Required: 
const express = require("express");
const config = require("config");
const RoutesSettings = require("./startup/RoutesSettings");
const mainErrorHandler = require("./startup/mainErrorHandler");
const {initDatabase} = require("./startup/db");
const createPrinciple = require("./startup/principle");
const routes = require("./startup/routes");
const app = express();

// Init Routes Settings: 
RoutesSettings(app);
app.use(config.get("settings.apis_prefix"), routes);

// Connect to Database
initDatabase();

// create principle's account if not exists: 
createPrinciple();

// Error Handeler (Any error will be populated to this function to send a resposne):
mainErrorHandler(app);

module.exports = app;