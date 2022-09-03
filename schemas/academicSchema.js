const mongoose = require('mongoose')
const { Schema } = mongoose

const deptSchema = mongoose.Schema({
  department: {
    type: String
  },
  departmentCode: {
    type: String
  }
})

const courseSchema = mongoose.Schema({
  courseTitle: {
    type: String
  },
  courseCode: {
    type: String
  },
  quizzes: [{
    type: Schema.Types.ObjectId,
    ref: 'quiz',
  }]
})

const academicSchema = mongoose.Schema({
  department: {
    type: Schema.Types.ObjectId, 
    ref: 'depts',
  },
  courses: [{ 
    type: Schema.Types.ObjectId,
    ref: 'courses',
  }]
})

deptModel = mongoose.model('depts', deptSchema)
academicModel = mongoose.model('academics', academicSchema)
courseModel = mongoose.model('courses', courseSchema)

module.exports = { academicModel, deptModel, courseModel }