const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    city:{
        type: String,
        required: true
    },
    officeAddress:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Location', locationSchema);