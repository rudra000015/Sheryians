import jwt from "jsonwebtoken"

export function authuser(req, res, next) {
    let token;

    // Prefer cookie token, fallback to Authorization header
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization;
        if (auth.startsWith("Bearer ")) token = auth.slice(7);
        else token = auth;
    }

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorised Access",
            success: false,
            err: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({
            msg: "Unauthorised Access",
            success: false,
            err: "Invalid or expired token"
        });
    }
}