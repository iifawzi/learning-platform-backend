const { Router } = require("express");
const { studentsRoutes } = require("../services/students");
const router = Router()

// Test Route: 
router.get("/test",(req, res) => {
    res.json("Test, server's working!");
});

// Routes Config: 
router.use("/students",studentsRoutes);

module.exports = router;