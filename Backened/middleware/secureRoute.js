import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

const secureRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies.jwt);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Token:", token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(402).json({ message: "Unauthorized" });
        }
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        console.log("Error in secureRoute middleware:" + error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default secureRoute;
