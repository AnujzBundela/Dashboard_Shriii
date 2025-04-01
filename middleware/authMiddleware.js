const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

