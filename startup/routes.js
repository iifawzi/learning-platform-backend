const { Router } = require("express");
const { studentsRoutes } = require("../services/students");
const { teachersRoutes } = require("../services/teachers");
const { groupsRoutes } = require("../services/groups");
const router = Router()

// Test Route: 
router.get("/test",(req, res) => {
    res.json("Test, server's working!");
});

// Routes Config: 
router.use("/students",studentsRoutes);
router.use("/teachers",teachersRoutes);
router.use("/groups",groupsRoutes)


module.exports = router;