    const express = require("express");
    const router = express.Router();
    const upload = require("../middleware/uploadMiddleware");
    const siteController = require("../controllers/siteController");  // Import your Site model


    router.put("/content", upload.single("logo"), siteController.content); 
    router.get("/website", siteController.website)

    module.exports = router;









































    
    // Update website content
    // router.put("/content", upload.single("logo"), async (req, res) => {
    //     try {
    //         const { title, description } = req.body;
    
    //         // If logo was uploaded, the file information will be available in req.file
    //         let logoPath = req.file ? `/uploads/${req.file.filename}` : null; // Store the path of the uploaded file
    
    //         let site = await Site.findOne();
    //         if (!site) {
    //             site = new Site({ title, description, logo: logoPath });
    //         } else {
    //             site.title = title;
    //             site.description = description;
    //             if (logoPath) {
    //                 site.logo = logoPath; // Update the logo if a new file was uploaded
    //             }
    //         }
    
    //         await site.save();
    //         res.json({ message: "Content updated successfully", site });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // });

// module.exports = router;


// Fetch latest website content
// router.get("/website", async (req, res) => {
//     try {
//         const site = await Site.findOne();
//         if (!site) {
//             return res.status(404).json({ message: "No content found" });
//         }
//         res.json(site);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });




// const express = require("express");
// const router = express.Router();
// const Site = require("../models/Site"); // Ensure this model exists

// // Add this GET route to fetch website content
// router.put("/website", async (req, res) => {
//   try {
//     const site = await Site.findOne();
//     if (!site) return res.status(404).json({ error: "No website content found" });
//     res.json(site);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;



// router.put("/content", siteController.content);
// const express = require("express");
// const router = express.Router();
// const Site = require("../models/Site");

// // Fetch Website Content
// router.get("/website", async (req, res) => {
//   try {
//     const siteData = await Site.findOne(); // Fetch the latest data
//     if (!siteData) {
//       return res.json({ title: "Default Title", description: "Default description", logo: "default-logo.png" });
//     }
//     res.json(siteData);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching site content" });
//   }
// });

// module.exports = router;



// router.put("/content", async (req, res) => {
//     try {
//         const { title, description, logo } = req.body;

//         let site = await Site.findOne();
//         if (!site) {
//             site = new Site({ title, description, logo });
//         } else {
//             site.title = title;
//             site.description = description;
//             site.logo = logo;
//         }

//         await site.save();
//         res.json({ message: "Content updated successfully", site });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });



// const upload = require("../middleware/uploadMiddleware");