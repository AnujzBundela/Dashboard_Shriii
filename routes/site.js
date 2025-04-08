const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ Multer Middleware Import

// ✅ Apply Multer middleware to handle form-data (file + text data)
router.put("/content", verifyToken, upload.single("logo"), siteController.content);
router.get("/user-changes", verifyToken, siteController.getUserChanges);
router.get("/website", siteController.website);  // ye bhi same
    


    module.exports = router;
























