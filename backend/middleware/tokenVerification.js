import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.user; // you’re storing token in cookie named "user"

    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // <-- you need this
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default verifyToken;
