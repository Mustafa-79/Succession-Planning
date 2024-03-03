const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test, registerUser, loginUser, getProfile, retrieveName, resetPassword, retrieveSecurityQuestion, setPassword} = require('../controllers/authControllers')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', loginUser)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/registerUser', retrieveName)
router.post('/resetPassword', resetPassword)
router.post('/retrieveSecurityQuestion', retrieveSecurityQuestion)
router.post('/resetPasswordFinalStep', setPassword)

module.exports = router