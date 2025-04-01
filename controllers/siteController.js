const Site = require("../models/Site");
const upload = require("../middleware/uploadMiddleware");

  // Update webiste Content
   const content = async (req, res) => {
        try {
            const { title, description } = req.body;
    
            // If logo was uploaded, the file information will be available in req.file
            let logoPath = req.file ? `../NewProject_Back/uploads/${req.file.filename}` : null; // Store the path of the uploaded file
    
            let site = await Site.findOne();
            if (!site) {
                site = new Site({ title, description, logo: logoPath });
            } else {
                site.title = title;
                site.description = description;
                if (logoPath) {
                    site.logo = logoPath; // Update the logo if a new file was uploaded
                }
            }
            await site.save();
            res.json({ message: "Content updated successfully", site });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };
  


    // Fetch website Content
   const website = async (req, res) => {
        try {
            const site = await Site.findOne();
            if (!site) {
                return res.status(404).json({ message: "No content found" });
            }
            res.json(site);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

module.exports = { content , website};






























// const website = async (req, res) => {
//   try {
//     const { title, description, logo } = req.body;

//     if (!title || !description || !logo) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Update in database (assuming MongoDB)
//     const updatedSite = await Site.findOneAndUpdate(
//       {}, // Find the first document
//       { title, description, logo },
//       { new: true, upsert: true } // Create if not exists
//     );

//     res.json({ message: "Content updated successfully", site: updatedSite });
//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




// Fetch Website Content
// const website = async (req, res) => {
//   try {
//     const site = await Site.findOne();
//     if (!site) {
//       return res.status(404).json({ message: "Site content not found" });
//     }
//     res.json(site);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Update Website Content (Admin Only)
// // (You may add auth middleware to check if req.user.isAdmin is true)
// const content = async (req, res) => {
//   try {
//     let site = await Site.findOne();
//     if (!site) {
//       site = new Site();
//     }
    
//     // Update title and description
//     if (req.body.title) site.title = req.body.title;
//     if (req.body.description) site.description = req.body.description;

//     // If a file is uploaded, update the logo
//     if (req.file) {
//       site.logo = `/uploads/${req.file.filename}`;
//     }

//     site.updatedAt = Date.now();
//     await site.save();

//     res.json({ message: "Site content updated successfully", site });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// module.exports = { website, content };


