const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const submissionSchema = new mongoose.Schema({
    userID:{
        type: Schema.Types.ObjectID,
        required: true
    },
    quizID:{
        type: Schema.Types.ObjectID,
        required: true
    },
    answers:{
        type: Array,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
})

submissionModel = mongoose.model('submission', submissionSchema)
module.exports = submissionModel