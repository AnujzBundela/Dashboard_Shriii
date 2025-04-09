const UserChange = require("../models/UserChange");

const content = async (req, res) => {
  try {
    const { title, description } = req.body;
    const logo = req.file?.filename;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and Description are required" });
    }

    // Check user already has changes?
    let userChange = await UserChange.findOne({ userId: req.userId });

    if (!userChange) {
      // Pehli baar data save hoga
      userChange = new UserChange({
        userId: req.userId,
        changes: [{ title, description, logo }]
      });
    } else {
      // Purane data me naye changes add hoga
      userChange.changes.push({ title, description, logo });
    }

    await userChange.save();

    res.status(201).json({ message: "Changes Saved Successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
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

// ✅ Ye function tujhe banana tha:
const website = async (req, res) => {
  try {
    const userId = req.query.userId;  // frontend se query ke through userId ayega

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userChange = await UserChange.findOne({ userId });

    if (!userChange) {
      return res.json({ title: "Default Title", description: "Default Description", logo: "" });
    }

    const lastData = userChange.changes[userChange.changes.length - 1];

    res.json(lastData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// ✅ Export all functions properly
module.exports = {
  content,
  getUserChanges,
  website,  // Yeh zaruri hai warna woh error aayega
};
