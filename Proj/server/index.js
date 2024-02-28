const express = require('express')
const dotenv =  require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')

// database connection
// mongoose.connect(process.env.MONGO_URL)
mongoose.connect('mongodb+srv://ayainfida:vv69RlqX1n4nn9BH@cluster0.dkebqmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = 8000
app.listen(port, () => console.log('Server is running on port', port))
