const User=require('../schema/user')

//read
exports.read=async (req,res)=>{
    await User.find().then(data=>{
        res.status(200).send({
            message:"Data fetched",
            user:data
        });
    }).catch(e=>{
        res.status(500).send("Error:"+e)
    })
}

// exports.findById= async (req, res) => {
//     const { id } = req.params;
//       await User.findById(id).then(data => {
//         if (!data) {
//           res.status(404).send("User Not Found");
//         } else {
//           res.status(200).send({
//             message: "data fetched",
//             user: data
//           });
//         }
//       }).catch(e=> {
//         res.status(500).send("Error:"+e); 
//       });
// }
    

//create
exports.create= async (req, res) => {
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
}

exports.update= async (req, res) => {
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
}

//delete
exports.delete= async (req, res) => {
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
}
