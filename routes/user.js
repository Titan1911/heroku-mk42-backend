const express = require('express')
const router = express.Router();
const userModel = require('../schemas/userSchema')
const { deptModel } = require('../schemas/academicSchema')
const bcrypt = require('bcrypt')
const salt = process.env.SALT
const crypto = require('crypto')

router.get('/', (req, res) => {
    res.send("Helloo there!")
})

router.post('/add-user', async (req, res) => {
    const userData = req.body
    const addingData = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        authToken: '',
    }
    // console.log(userData)
    const email = userData.email
    const password = userData.password
    const found = await userModel.find({ email: email }).exec()
    if (found.length !== 0) {
        // console.log("u already exists just login not signup")
        res.send("user already exists")
    }
    else {
        try {
            const hashedPwd = await bcrypt.hash(password, salt);
            addingData.password = hashedPwd
            const token = crypto.randomBytes(32).toString('hex')
            addingData.authToken = token
            const newUser = new userModel(addingData)
            await newUser.save()
            res.send(token)
            // console.log('Registration Successful!')
        }
        catch (err) {
            // console.log(err)
        }
    }
})

router.post('/login-user', async (req, res) => {
    const userData = req.body
    const password = userData.password
    const user = await userModel.findOne({ email: userData.email }).exec()
    if (user && await bcrypt.compare(password, user.password)) {
        // console.log(await bcrypt.compare(password, user.password))
        token = user.authToken
        // console.log("sending for " + password)
        user.password = ""
        res.send(user)
    }
    else {
        // console.log('invalid email and password')
        res.send('invalid email and password')
    }
})
router.post('/add-user-data', async (req, res) => {
    const userData = req.body.data;
    const additionalData = {
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        university: userData.university,
        degree: userData.degree,
        department: userData.department,
        semister: userData.semister,
        section: userData.section,
        usn: userData.usn,
        academicDetails: '',
    }
    const token = req.body.token
    try {
        const user = await userModel.findOne({ authToken: token }).exec()
        const dept = await deptModel.findOne({ departmentCode: additionalData.department }).exec()
        // console.log(token)
        // console.log("the user is : " + user)
        const academicDetails = await academicModel.findOne({ department: dept._id })
        additionalData.academicDetails = academicDetails
        const userinstance = await userModel.updateOne({ _id: user._id }, additionalData)
        // await userinstance.save()
        // console.log(userinstance)
    }
    catch (err) {
        // console.log(err)
        res.send(err)
    }
})

// router.post('/academic_test', async (req,res) =>{
// 	const academicDetails = req.body

// 	const addingData = {
// 		email: academicDetails.email,
// 		password: academicDetails.password,
// 		firstName: academicDetails.firstName,
// 		lastName: academicDetails.lastName,
// 		subjects: academicDetails.subjects,
// 	}

// 	const newUser = userModel(addingData)
// 	await newUser.save()
// 	res.send(newUser)


// })

router.get('/authenticate', authenticate, async (req, res) => {
    res.json({ auth: true, msg: 'U are Authenticated' })
})

async function authenticate(req, res, next) {
    const token = req.header('x-access-token')
    // console.log(token)
    try {
        user = await userModel.findOne({ authToken: token }).exec()
        next()
    }
    catch {
        // console.log('token dosent exists')
        res.send('token dosent exists')
    }
}

module.exports = router;
