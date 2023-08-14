const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(403).json({
            message: 'You do not have a token!'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SALT);
        req.user = decoded;
    } catch(error) {
        return res.status(403).json({
            message: 'Invalid token!'
        });
    }

    next();

};

module.exports = verifyToken;