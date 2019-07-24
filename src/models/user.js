const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true,minlength:6},
});

//hash password before save or modified
userSchema.pre('save',function(next){
    const user = this;
    //only hash password if it is modified or new
    if(!user.isModified('password')) return next();

    //generate salt for hashing
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err);

        //hash password using salt
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign({_id:user._id},process.env.JWT_KEY);
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = User;