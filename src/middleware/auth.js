const jwt = require('jsonwebtoken');


module.exports = async function auth(req,res,next){

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({message:"Access denied,no token available"});
    try{
        const decodedData = jwt.verify(token,process.env.JWT_KEY);
        console.log(decodedData);
        const user = await User.findOne({_id:decodedData.id});
        req.user = user;
        req.token = token;
        next();
    }catch(err){
        res.status(400).json({message:"Invalid token"});
    }
}