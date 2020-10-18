// Essential Require: 
const express = require("express");
const router = express.Router();
const validateSchema = require("../../middlewares/validateSchema");
// Students Stuff: 
const studentsSchema = require("./students.validation");
const studentsController = require("./students.controller");
// Routes: 
router.post("/signup",validateSchema(studentsSchema.signup,'body'),studentsController.signup);


module.exports = router;