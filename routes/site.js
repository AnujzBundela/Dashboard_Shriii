const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Content Update
router.put("/content",verifyToken,upload.fields([{ name: "logo", maxCount: 1 },{ name: "bannerImage", maxCount: 1 }]),siteController.content);

// Get User Changes
router.get("/user-changes", verifyToken, siteController.getUserChanges);

// Website Data
router.get("/website", siteController.website);

// Gallery Slider Upload
router.post("/upload-slider-images", verifyToken, upload.array("images", 20), siteController.uploadSliderImages);

// Title Slider Upload
router.post("/upload-title-slider", verifyToken, upload.array("images", 10), siteController.uploadTitleSlider);

// Products Update
router.put("/update-products", verifyToken, upload.array("images", 3), siteController.updateProducts);

// Get User Changes
router.get("/user-changes", verifyToken, siteController.getUserChanges);



// 🔽 New: Get slider images
router.get("/slider-images", siteController.getSliderImages);

// 🔽 New: Get products
router.get("/products", siteController.getProducts);

router.get("/title-slider", siteController.getTitleSlider)



module.exports = router;


























