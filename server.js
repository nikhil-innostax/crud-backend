const express=require('express')
const bodyParser=require('body-parser')
const dbConfig=require('./config/database.config')
const mongoose=require('mongoose');
const cors=require('cors')
const UserRoute = require('./routes/user')
const app=express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use(cors());

mongoose.connect(dbConfig.url).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use('/users/',UserRoute)

app.listen(3000,()=>{
    console.log('Server is running on 3000')
});
