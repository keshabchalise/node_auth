const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register',async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(400).json({message:"Invalid email or password",success:false});
        user = new User(req.body);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).status(200).json({user,success:true});
    }catch(error){
        res.status(400).json({message:error.message,success:false});

    }
});

router.post('/login',async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({message:"Invalid email or password",success:false});
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).json({message:"Invalid email or password",success:false});
        const token = user.generateAuthToken();
        res.send({token});
    }catch(error){
        res.status(400).json({message:error.message,success:true});
    }
})

router.get('/demo',auth,(req,res)=>{
    res.send({response:'Demo testing for authorization.'});
})

module.exports = router;