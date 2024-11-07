import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Hash password
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT Token
export const generateToken = (user) => {
  const payload = { userId: user.id, username: user.username, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Authenticate Token Middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if token is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Check if the token is in the expected "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: 'Invalid token format.' });
  }

  try {
    // Verify the token and set req.user
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach the decoded user data to req.user
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
