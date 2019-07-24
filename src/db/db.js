const mongoose = require('mongoose');

const mongodbUrl = "mongodb+srv://keshab40:keshab40@cluster0-kxx1k.mongodb.net/test?retryWrites=true&w=majority";
const options = {
    useNewUrlParser:true,
    useCreateIndex:true
};
mongoose.connect(mongodbUrl,options)
    .then(()=> console.log('DB is ready'))
    .catch(err=> console.log('DB is not ready, check connection',err.message));