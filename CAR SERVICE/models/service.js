const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    description:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    carPlate:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);