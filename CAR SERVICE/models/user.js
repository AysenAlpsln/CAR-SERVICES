const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    
});

module.exports = mongoose.model('User', userSchema);

