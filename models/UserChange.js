const mongoose = require("mongoose");

const userChangeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    changes: [
        {
            title: String,
            description: String,
            logo: String,
            updatedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true }); // ✅ Add timestamps


module.exports = mongoose.model("UserChange", userChangeSchema);
