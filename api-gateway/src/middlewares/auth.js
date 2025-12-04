const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({ error: 'No Token Provided' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired Token' });
    }
};

module.exports = authMiddleware;