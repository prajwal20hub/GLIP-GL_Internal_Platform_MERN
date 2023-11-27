const mongoose = require('mongoose')

const totalRegSchema = new mongoose.Schema({
    total_registrations:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Total_Registration', totalRegSchema);