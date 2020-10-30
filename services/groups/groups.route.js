// Essential Require: 
const express = require("express");
const router = express.Router();
const validateSchema = require("../../middlewares/validateSchema");
// Groups Stuff: 
const groupsSchema = require("./groups.validation");
const groupsController = require("./groups.controller");
const granted = require("../../middlewares/granted");
const isAuth = require("../../middlewares/is-auth");
// Routes: 
router.post("/create",isAuth(),granted("create","groups"),validateSchema(groupsSchema.create,'body'),groupsController.create);
module.exports = router;