const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    empName: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    empDept: {
        type: String,
        require: true
    },
    empFeedName: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema)