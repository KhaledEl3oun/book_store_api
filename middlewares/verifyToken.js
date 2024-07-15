const jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {
    const token = req.headers.token;
    if (token) {
     try {
        const decoded = jwt.verify(token, "secretKey")  
     req.user = decoded;    
     next(); 
     } catch (error) {
        res.status(401).json({message: "invalid token"})
     }
    } else {
        res.status(401).json({message: "no token provided"})
    }
}

function verifyTokenAndAuthorization(req,res,next) {
    verifyToken(req, res, () => {
        if (!req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            return res.status(403).json({message:"you are not allowed"})
        }
    })
}
function verifyIsAdmin(req,res,next) {
    verifyToken(req,res,()=> {
        if (!req.user.isAdmin) {
            next();
        }else{
            return res.status(403).json({message:"you are not allowed, only admin allowed"})
        }
    })
}
module.exports = {
    verifyToken,
verifyTokenAndAuthorization,
verifyIsAdmin
}
