const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const token = req.header("auth-token");
    
    if(!token) return res.status(401).send("you are not authorized");
try{
    const authorization = jwt.verify(token,process.env.jwt_secretkey);
    req.user = authorization ;
    next();
}
catch(error){
    res.status(400).send("Invalid token");
}
}
