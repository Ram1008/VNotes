var jwt = require('jsonwebtoken');
const JWT_secret = 'i$m$ram$cool';
const fetchUser =(req,res,next)=>{
    // Get the user for jwt token and add id ti req object

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Use valid 1 token'});

    }
    try{
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error: 'Use valid 2 token'})

    }
   
}

module.exports = fetchUser;
