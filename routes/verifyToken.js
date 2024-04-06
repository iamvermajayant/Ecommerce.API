const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeaders = req.headers.token;
    if(authHeaders){
        const token = authHeaders.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
            if(err){
                return res.status(403).json("Token is Invalid");
            }
            req.user = user;
            next();
        });
    }
    else{
        return res.status(401).json("You are not Authenticated");
    }
}


const verifyTokenWithAutorization = (req, res, next) => {
    verifyToken(req,res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not authorized");
        }
    })
}



const verifyTokenWithAdmin = (req, res, next) => {
    verifyToken(req,res, ()=> {
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not authorized");
        }
    })
}


module.exports = {verifyToken, verifyTokenWithAutorization, verifyTokenWithAdmin};


