const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User',
        require: true
    },
    task:{
        type: String,
        require: true
    },
    assignedBy: {
        type: String,
        require: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Task', taskSchema)