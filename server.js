const express=require('express')
const bodyParser=require('body-parser')
const dbConfig=require('./config/database.config')
const mongoose=require('mongoose');
const User = require('./Schema/User');
const cors=require('cors')
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


//read
app.get('/',async (req,res)=>{
    await User.find().then(data=>{
        res.status(200).send({
            message:"Data fetched",
            user:data
        });
    }).catch(e=>{
        res.status(500).send("Error:"+e)
    })
})

app.get("/:id", async (req, res) => {
    const { id } = req.params;
      await User.findById(id).then(data => {
        if (!data) {
          res.status(404).send("User Not Found");
        } else {
          res.status(200).send({
            message: "data fetched",
            user: data
          });
        }
      }).catch(e=> {
        res.status(500).send("Error:"+e); 
      });
});
    

//create
app.post("/create", async (req, res) => {
    const { first, last, email,roll } = req.body;
    const user = new User({
      first,last,email,roll
    });
    await user.save().then(data => {
      res.status(200).send({
        message: "Added Succesfully",
        user: data
      });
    }).catch(e => {
      res.status(400).send("Error:" + e); 
    });
});

app.patch("/:id", async (req, res) => {
    if (!req.body) {
      res.status(404).send("Data is needed to update");
      return;
    }
    
    const { id } = req.params;
    
    await User.findByIdAndUpdate(id, req.body, { new: true }).then(data => {
      res.status(200).send({
        message: 'updated Succesfully',
        user: data
      });
    }).catch(e=> {
      res.status(500).send("Error:" + e);
    });
});

//delete
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id).then(data => {
      if (!data) {
        res.status(404).send("User Not Found");
      } else {
        res.status(200).send({
          message: "User deleted successfully",
          user: data
        });
      }
    }).catch(e => {
      res.status(500).send("Error:" + e); 
    });
});

app.listen(3000,()=>{
    console.log('Server is running on 3000')
})