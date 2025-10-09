import jwt from "jsonwebtoken";

// Middleware for regular users (non-admins)
export const verifyToken = (req, res, next) => {
    const token = req.cookies.user; // token stored in cookie named "user"

    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If role exists, it means this is an admin token
        if (decoded.role && decoded.role === "Admin") {
            return res.status(403).json({ message: "Access denied for admins" });
        }

        // Attach decoded info for later use (optional)
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Middleware for admins only
export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.user; // same cookie

    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);
        // Only allow users with an admin role
        if (!decoded.role === 'Super Admin' || !decoded.role === 'Admin' || !decoded.role === 'Support') {
            return res.status(403).json({ message: "Access denied" });
        }

        req.user = decoded; // store decoded info

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default {
    verifyToken,
    verifyAdminToken
};
