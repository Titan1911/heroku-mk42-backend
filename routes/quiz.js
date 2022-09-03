const express = require('express')
const router = express.Router();
const quizModel = require('../schemas/quizSchema')
const submissionModel = require('../schemas/submissionSchema')


router.get('/quiz/:quizID', async (req, res) => {
  const quizID = req.params.quizID
  // console.log(quizID)
  try {
    const quiz = await quizModel.findOne({ _id: quizID }).exec()
    // console.log('quiz ID found')
    quiz.correctAnswers = ''
    res.send(quiz)
    // console.log(quiz)
  }
  catch (err) {
    // console.log(err)
    res.send(err)
  }
})

router.post('/quiz/:quizID', async (req, res) => {

  const quizID = req.params.quizID
  const answers = req.body.answersData
  const userID = req.body.userID

  // console.log(answers)
  // console.log(userID)
  // console.log(data)

  let newSubmission = {
    answers: answers,
    userID: userID,
    quizID: quizID,
  }

  try {
    const quiz = await quizModel.findOne({ _id: quizID }).exec()
    correctAnswers = quiz.correctAnswers
    // console.log(quiz.correctAnswers)
    // console.log(correctAnswers)
    let scoredMarks = 0
    for (i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] == answers[i]) {
        scoredMarks += 1
      }
    }
    newSubmission.score = scoredMarks
    const submission = new submissionModel(newSubmission)
    await submission.save()
    // console.log(submission)
    // console.log(submission.score)
    res.send(`${submission.score}`)
    // console.log('answers saved')
  }
  catch (err) {
    res.send('ERROR!')
    // console.log('quiz not found')
    // console.log(err)
  }
})

module.exports = router;