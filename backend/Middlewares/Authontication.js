const jwt = require('jsonwebtoken');
const user = require('../Models/usermodel'); // Import User model

// Middleware to check if the user is authenticated
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the header
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication token required' });
    }
  
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the user by the decoded ID
      const User = await user.findById(decoded.id);
  
      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Attach the user object to req.user
      req.user = User; // This should be the correct way to assign user
  
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error('Authentication error:', err);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
module.exports = authenticate;
