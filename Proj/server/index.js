const express = require('express')
const dotenv =  require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const init_db = require('./mongodb_init')
const app = express()
const cookieParser = require('cookie-parser')

// import employee model
const Employee = require('./models/employee')


// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// Initialize database
const db = mongoose.connection;
init_db(db);


// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = 8003
app.listen(port, () => console.log('Server is running on port', port))
