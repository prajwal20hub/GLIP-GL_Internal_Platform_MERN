const jwt = require("jsonwebtoken")

const tokenValidation = (req,res,next)=> {
    let token
    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err,decoded)=> {
            if(err){
                res.status(403)
                throw new Error('User is not authorized or token is invalid')
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(403)
            throw new Error('User is not authorized or token is invalid/missing')
        }
    }
    else{
        res.status(403)
        throw new Error('User is not authorized or header is invalid/missing')
    }
}

module.exports = tokenValidation;