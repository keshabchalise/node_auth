const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    const saltRounds = 10;
    //generate salt for hashing
    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err) return next(err);

        //hash password using salt
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const jwtKey = 'jsonwebtokenkey';
    const token = jwt.sign({_id:user._id},jwtKey);
    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = User;