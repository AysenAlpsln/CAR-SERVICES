const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    plate:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    customer:{
        type: String,
        required: true
    },
    km:{
        type: Number,
        required: true
    },
    services:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: false
        }
    ]
});

module.exports = mongoose.model('Car', carSchema);
