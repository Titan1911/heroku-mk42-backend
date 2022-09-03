const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/user')
const academicRoutes = require('./routes/academic')
const quizRoutes = require('./routes/quiz')
const dotenv = require("dotenv")
dotenv.config()


app.use(express.json())
app.use(cors())
app.use('/api', userRoutes)
app.use('/academics', academicRoutes)
app.use('/api', quizRoutes)


mongoose.connect(
    process.env.MONGO_DB_URI,
    { useNewUrlParser: true }
)

app.listen(process.env.PORT || 8000, () => {
    console.log(`backend running on ${process.env.PORT} :)`)
})
