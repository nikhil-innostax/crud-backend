const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    first: {
        type: String,
        default: ''
    },
    last: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    roll:{
        type:Number,
        required:true,
        unique:true
    }
});
const User = new mongoose.model('User', schema);
module.exports = User;
