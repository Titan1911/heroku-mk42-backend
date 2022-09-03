const express = require('express')
const router = express.Router()
const { courseModel } = require('../schemas/academicSchema')
const userModel = require('../schemas/userSchema')
const submissionModel = require('../schemas/submissionSchema')
const quizModel = require('../schemas/quizSchema')
const { academicModel } = require('../schemas/academicSchema')

router.post('/', async (req, res) => {
	// DATABASE UPDATE CODE //
	// const users = await userModel.find({})
	// const academics = await academicModel.find({})
	// for(i=0;i<=users.length;i++){
	// 	const random = Math.floor(Math.random() * academics.length);
	// 	const user = users[i]
	// 	user.academicDetails = academics[random].id
	// 	await user.save()
	// }
	// await user.save()
	// res.send('result')
	// console.log(user)

	// POPULATION CODE //
	// console.log("route is called")
	token = req.body.token
	// console.log(token)
	const user = await userModel
		.findOne({ authToken: token })
		.populate({
			path: 'academicDetails',
			populate: {
				path: 'department'
			}
		})
		.populate({
			path: 'academicDetails',
			populate: {
				path: 'courses'
			}
		})
	// console.log("our user is ", user)
	res.send(user)
})


router.post('/get-course', async (req, res) => {
	const courseID = req.body.cid
	const userID = req.body.userID
	// console.log(courseID)
	// console.log(userID)
	const course = await courseModel
		.findOne({ _id: courseID })
		.populate('quizzes')
	const quizAttempted = await submissionModel.find({ userID: userID }).select('quizID -_id').select('score')
	// console.log(quizAttempted)
	res.send({ 'quizAttempted': quizAttempted, 'course': course })
})

// ROUTE FOR INSERTING QUIZZES INTO COURSES //
// router.get('/update-quiz', async (req, res)=>{
// 	const course = await courseModel.find({}).exec()
// 	const quizzes = await quizModel.find({}).exec()
// 	for(let k=0; k<course.length; k++){
// 		let quiz = []
// 		let j = k
// 		for(let i=0; i<3; i++, j+=10){
// 			quiz.push(quizzes[j])
// 		}
// 		course[k].quizzes = quiz
// 		course[k].save()
// 		// res.send(course)
// 		console.log(course[k])
// }
// 	res.send('done')
// })

// ROUTE FOR INSERTING RANDOM COURSES TO A DEPT //
// router.get('/update-course', async (req, res)=>{
// 	const aca = await academicModel.find({})
// 	const courses = await courseModel.find({})
	
// 	for(let i=0; i<aca.length; i++){
// 		let course = [];
// 		for(let k=0; k<3; k++){
// 			j=Math.floor(Math.random()*10)
// 			if (course.includes(courses[j])){
// 				k-=1
// 				console.log('condition here')
// 				continue
// 			}
// 			course.push(courses[j])
// 		}
// 		aca[i].courses = course
// 		aca[i].save()
// 		console.log(aca[i])
// 	}
// 	res.send('done')
// })

module.exports = router;