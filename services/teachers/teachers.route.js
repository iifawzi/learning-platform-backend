// Essential Require: 
const express = require("express");
const router = express.Router();
const validateSchema = require("../../middlewares/validateSchema");
// Teachers Stuff: 
const teachersSchema = require("./teachers.validation");
const teachersController = require("./teachers.controller");
const granted = require("../../middlewares/granted");
const isAuth = require("../../middlewares/is-auth");
// Routes: 
router.post("/create",isAuth(),granted("create","teachers"),validateSchema(teachersSchema.create,'body'),teachersController.create);
module.exports = router;