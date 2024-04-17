const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { mongoose } = require('mongoose')
const init_db = require('./mongodb_init')
const init_weights = require('./weights_init')
const bodyParser = require('body-parser');
const app = express()
const cookieParser = require('cookie-parser')



// database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err))

// Initialize database
const db = mongoose.connection;
init_db(db);

// Initialize weights
init_weights(db);


// middleware
// Allow requests from http://localhost:5173 and include credentials
app.use(cors({
    origin: true,
    credentials: true,
  }));
// app.use(express.json())
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Allow requests from http://localhost:5173

app.use('/', require('./routes/authRoutes'))

const port = 8000
app.listen(process.env.PORT || port), '0.0.0.0' ,() => console.log('Server is running on port', process.env.PORT || port)
