const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    repositoryUrl: { type: String, required: true },  // Important Field
});

module.exports = mongoose.model("User", userSchema);


