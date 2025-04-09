const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Route
const register = async (req, res) => {
  console.log("register");
  console.log(req.body);

  const { username, email, password, repositoryUrl } = req.body; // Add Repository URL

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      repositoryUrl,  // Save Repo URL
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        repositoryUrl: user.repositoryUrl,
      }
    });

  } catch (err) {
    console.log("Error in Login API:", err);  // <-- Yeh Add Kar De
    res.status(500).json({ error: err.message });
  }
};


module.exports = { register, login };















 // // Include isAdmin in the JWT payload
    // const token = jwt.sign(
    //   { userId: user._id, isAdmin: user.isAdmin }, // Now includes isAdmin
    //   process.env.JWT_SECRET, // Ensure you are using the correct secret key from .env
    //   { expiresIn: "1h" }
    // );

    // res.json({ message: "Login successful", token, isAdmin: user.isAdmin });