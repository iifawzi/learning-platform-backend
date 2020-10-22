// Essential Require: 
const express = require("express");
const router = express.Router();
const validateSchema = require("../../middlewares/validateSchema");
// Students Stuff: 
const studentsSchema = require("./students.validation");
const studentsController = require("./students.controller");
const granted = require("../../middlewares/granted");
const isAuth = require("../../middlewares/is-auth");
// Routes: 
router.post("/signup",validateSchema(studentsSchema.signup,'body'),studentsController.signup);
router.post("/signin",validateSchema(studentsSchema.signin,'body'),studentsController.signin);
router.post("/refresh_token",isAuth(),granted("updateOwn","token"),validateSchema(studentsSchema.refresh_token,'body'),studentsController.refresh_token);


module.exports = router;