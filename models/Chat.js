const mongoose = require('mongoose');
const UserSchema = require('../models/User');

const ChatSchema = new mongoose.Schema({
    from: {
        type: UserSchema.Types.ObjectId,
        ref: 'user',
        required: true
    
    },
    to: {
        type: UserSchema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Chat', ChatSchema);