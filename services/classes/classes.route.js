// Essential Require: 
const express = require("express");
const router = express.Router();
const validateSchema = require("../../middlewares/validateSchema");
// classes Stuff: 
const classesSchema = require("./classes.validation");
const classesController = require("./classes.controller");
const granted = require("../../middlewares/granted");
const isAuth = require("../../middlewares/is-auth");
// Routes: 
router.post("/create",isAuth(),granted("create","classes"),validateSchema(classesSchema.create,'body'),classesController.create);
router.get("/",isAuth(),granted("readOwn","classes"),classesController.getClasses);
module.exports = router;