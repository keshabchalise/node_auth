const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register',async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(400).json({message:"Invalid email or password",success:false});
        user = new User(req.body);
        await user.save();
        const token = user.generateAuthToken();
        console.log('token',token);
        res.status(200).json({user,token,success:true});
    }catch(error){
        res.status(400).json({message:error.message,success:false});

    }
})

module.exports = router;