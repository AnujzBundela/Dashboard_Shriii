// const jwt = require("jsonwebtoken");

// module.exports.verifyToken = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ error: "Access denied" });

//     try {
//         const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ error: "Invalid token" });
//     }
// };
// authMiddleware.js


// authMiddleware.js


const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    req.userId = decoded.id;
    next();
  });
};
