const { Router } = require("express");
const { studentsRoutes } = require("../services/students");
const { teachersRoutes } = require("../services/teachers");
const { classesRoutes } = require("../services/classes");
const  teachers_classes_model = require("../services/teachers_classes"); // TODO:: to be deleted when adding routes 
const router = Router()

// Test Route: 
router.get("/test",(req, res) => {
    res.json("Test, server's working!");
});

// Routes Config: 
router.use("/students",studentsRoutes);
router.use("/teachers",teachersRoutes);
router.use("/classes",classesRoutes)


module.exports = router;