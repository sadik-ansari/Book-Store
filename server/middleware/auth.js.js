const jwt = require('jsonwebtoken')

const createUserToken = async (userId) => {
    return jwt.sign({ userId }, process.env.SECRET, { expiresIn: "1h" })
}

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}

module.exports = { createUserToken, authMiddleware }