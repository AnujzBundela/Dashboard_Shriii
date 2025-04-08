const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Files will be saved in 'uploads/' folder (make sure to create it)
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Save file with unique name and original extension
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Check file type (optional)
const fileFilter = (req, file, cb) => {
  // Allowed file extensions (example: images only)
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
};

// Configure upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter,
});

module.exports = upload;


