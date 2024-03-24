const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    //get bearer token
    let bearerToken = req.headers.authorization;
    if(bearerToken == undefined){
        return res.send({message:"Unauthorized access"});
    }

    let token = bearerToken.split(" ")[1];
    try {
        let decodedToken = jwt.verify(token,"abcdef");
        next(); //token verification successful
    } catch (error) {
        res.send({message:error.message});
    }
}

module.exports = verifyToken;