const mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = process.env.MONGODB_CONNECTION_URL;
const options = {
    useNewUrlParser:true,
    useCreateIndex:true
};
mongoose.connect(mongodbURL,options)
    .then(()=> console.log('DB is ready'))
    .catch(err=> console.log('DB is not ready, check connection',err.message));