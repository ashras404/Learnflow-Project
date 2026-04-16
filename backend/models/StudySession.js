const mongoose = require('mongoose');

const studySessionSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    topic: { 
        type: String, 
        default: 'General Study' 
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date 
    },
    duration: { 
        type: Number // We will store this in minutes
    }
}, { timestamps: true });

module.exports = mongoose.model('StudySession', studySessionSchema);