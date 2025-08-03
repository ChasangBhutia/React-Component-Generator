const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Token received:", token);

  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decodedUser;
    console.log("Token verified. User:", decodedUser);

    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};
