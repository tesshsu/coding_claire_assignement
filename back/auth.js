const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createJWT = (userData) => {
  return jwt.sign({ data: userData }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyJWT = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

mmodule.exports = { createJWT, verifyJWT, authenticateJWT };
