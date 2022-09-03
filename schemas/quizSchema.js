const mongoose = require('mongoose')


const questionSchema = new mongoose.Schema({
  question:{
    type: String,
    required: true
  },
  options:{
    type: Array(String),
    required: true
  },
})


const quizSchema = new mongoose.Schema({
  questions: [questionSchema],
  title:{
    type: String,
    required: false,
  },
  maxMarks:{
    type: Number,
    required: false
  },
  timeLimit:{
    type: Number,
    required: false,
  },
  correctAnswers:[{
    type: String,
    required: false,
  }]
})


quizModel = mongoose.model('quiz', quizSchema)
module.exports = quizModel