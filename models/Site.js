const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    logo: { type: String }
});

module.exports = mongoose.model("Site", siteSchema);


