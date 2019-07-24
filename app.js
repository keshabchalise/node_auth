const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./src/routes/user');
require('./src/db/db');
const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/users',userRoute);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}...`);
})