const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

function extractToken(req) {
  // Prefer httpOnly cookie, but also allow Authorization header for APIs/tools.
  const cookieToken = req?.cookies?.jwtToken;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (typeof authHeader === "string") {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match) return match[1];
  }

  return null;
}

const isAuth = async (req, res, next) => {
  const token = extractToken(req);
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Not authorized, no token" 
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server misconfigured (missing JWT secret)",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded user is", decoded);
    req.userId = decoded.userId || decoded.id || decoded._id;
    
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token payload",
      });
    }

    // Attach user data to request (and ensure user still exists)
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }
    console.log("user is",user);
    req.user = user;
    
    next();
  } catch (error) {
    const isExpired = error?.name === "TokenExpiredError";
    return res.status(401).json({
      success: false,
      message: isExpired
        ? "Not authorized, token expired"
        : "Not authorized, token validation failed",
    });
  }
};

// Keep backward compatibility with `require('./authMiddleware')`
// and also expose helpers for routes that need role checks.
const authorizeRoles = (...roles) => (req, res, next) => {
  const userRole = req.user?.role;
  if (!userRole) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  if (!roles.includes(userRole)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};

module.exports = isAuth;
module.exports.authorizeRoles = authorizeRoles;
