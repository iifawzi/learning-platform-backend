const { Router } = require("express");
const router = Router()

// Test Route: 
router.get("/test",(req, res) => {
    res.json("Test, server's working!");
});



module.exports = router;