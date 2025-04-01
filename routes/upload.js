const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Endpoint for uploading a single file (for example, a logo)
router.post("/single", upload.fields([{ name: "file" }, { name: "logo" }]), (req, res) => {
  try {
    // After a successful upload, Multer adds a file object to the req object
    res.json({
      success: true,
      file: req.file,
    });
  } catch (error) {
    console.error(error);``
    res.status(500).json({ success: false, error: "File upload failed" });
  }
});



module.exports = router;











































// const authMiddleware = require("../middleware/authMiddleware");
// router.put("/website", authMiddleware, website);
