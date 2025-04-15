const UserChange = require("../models/UserChange");
const { get } = require("../routes/site");

// Pehle se likhe functions
const content = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { description, mobile, location } = req.body;
    const logo = req.files?.logo?.[0]?.filename;
    const bannerImage = req.files?.bannerImage?.[0]?.filename;

    if (!description || !mobile || !location) {
      return res.status(400).json({ error: "Description, Mobile, and Location are required" });
    }

    let userChange = await UserChange.findOne({ userId: req.userId });

    if (!userChange) {
      userChange = new UserChange({
        userId: req.userId,
        changes: [{ description, logo, bannerImage, mobile, location }]
      });
    } else {
      userChange.changes.push({ description, logo, bannerImage, mobile, location });
    }

    await userChange.save();

    res.status(201).json({ message: "Changes Saved Successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



const uploadTitleSlider = async (req, res) => {
  try {
    const images = req.files;
    const titles = req.body.titles;

    if (!images || images.length < 1) {
      return res.status(400).json({ error: "Minimum 1 image is required" });
    }

    if (images.length > 10) {
      return res.status(400).json({ error: "Maximum 10 images are allowed" });
    }

    if (!titles || titles.length !== images.length) {
      return res.status(400).json({ error: "Title count should match image count" });
    }

    const titleSliderData = images.map((img, index) => ({
      title: titles[index],
      image: img.filename
    }));

    const userChange = await UserChange.findOne({ userId: req.userId });

    if (!userChange) {
      return res.status(404).json({ error: "User not found" });
    }

    userChange.titleSliders = titleSliderData;  // <-- Ye important line hai
    await userChange.save();

    res.status(200).json({ message: "Title Sliders uploaded successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




// ✅ Naya Function - Slider Images Upload
const uploadSliderImages = async (req, res) => {
  try {
    const images = req.files;

    if (!images || images.length < 3) {
      return res.status(400).json({ error: "Minimum 3 images are required" });
    }

    if (images.length > 20) {
      return res.status(400).json({ error: "Maximum 20 images are allowed" });
    }

    const imageNames = images.map(img => img.filename);

    const userChange = await UserChange.findOne({ userId: req.userId });

    if (!userChange) {
      return res.status(404).json({ error: "User data not found" });
    }

    userChange.sliderImages = [...(userChange.sliderImages || []), ...imageNames];

    await userChange.save();

    res.status(201).json({ message: "Slider Images Uploaded Successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;
    const files = req.files;

    if (!productName || !productDescription) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!files || files.length !== 3) {
      return res.status(400).json({ error: "Exactly 3 Images Required" });
    }

    const userId = req.userId;

    const productData = files.map((file, index) => ({
      image: file.filename,
      title: Array.isArray(productName) ? productName[index] : productName,
description: Array.isArray(productDescription) ? productDescription[index] : productDescription,
    }));

    let userChange = await UserChange.findOne({ userId });

    if (!userChange) {
      userChange = new UserChange({ userId });
    }

    userChange.updateProducts = productData; // IMPORTANT LINE

    await userChange.save();

    res.status(201).json({ message: "Product Section Updated Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getUserChanges = async (req, res) => {
  try {
    const userId = req.user.userId;
    const changes = await UserChange.findOne({ userId });
    res.json(changes);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const website = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userChange = await UserChange.findOne({ userId });

    if (!userChange) {
      return res.json({ description: "", logo: "", bannerImage:"", mobile: "", location: ""});
    }

    res.json(userChange);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getSliderImages = async (req, res) => {
  const { userId } = req.query;
  try {
    const userChange = await UserChange.findOne({ userId });
    if (!userChange) return res.status(404).json({ message: "User not found" });

    res.json(userChange.sliderImages || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProducts = async (req, res) => {
  const { userId } = req.query;
  try {
    const userChange = await UserChange.findOne({ userId });
    if (!userChange) return res.status(404).json({ message: "User not found" });

    res.json(userChange.updateProducts || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const getTitleSlider = async (req, res) => {
  const { userId } = req.query;
  try {
    const userChange = await UserChange.findOne({ userId });
    if (!userChange) return res.status(404).json({ message: "User not found" });

    res.json(userChange.titleSliders || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  content,
  getUserChanges,
  website,
  uploadTitleSlider,
  uploadSliderImages,
  updateProducts,
  getSliderImages ,
  getProducts,
  getTitleSlider
  
};

