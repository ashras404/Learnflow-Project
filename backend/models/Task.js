const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    title: { type: String, required: true },
    subject: { type: String },
    description: { type: String },
    deadline: { type: Date },
    status: { 
        type: String, 
        enum: ['pending', 'completed'], 
        default: 'pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);