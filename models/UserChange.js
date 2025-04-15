const mongoose = require("mongoose");

const userChangeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    changes: [
        {
            description: String,
            bannerImage : String,
            logo: String,
            mobile: String,
            location: String,
            updatedAt: { type: Date, default: Date.now }
        }
    ],

    sliderImages: [String],  // Gallery Images

    titleSliders: [          // New for Title + Image
        {
            title: String,
            image: String
        }
    ],

    updateProducts: [              // New Product Section
        {
            title: String,
            description: String,
            image: String
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model("UserChange", userChangeSchema);


