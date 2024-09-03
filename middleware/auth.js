import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next)=>{
    try{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }

    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "please login first"
            })
        }
        req.user = decoded;
        next()

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}