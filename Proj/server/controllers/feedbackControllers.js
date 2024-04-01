
const User = require('../models/users')
const Employee = require('../models/employee')
const Position = require('../models/positions')
const Course = require('../models/course')
const Workshop = require('../models/workshop')
const HR_Admin = require('../models/hr_admin')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const FeedbackModel = require('../models/feedback')

const viewFeedbacks = async (reqs, resp) => {
    try {
        const feedbacks = await FeedbackModel.find()
        return resp.json(feedbacks)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    viewFeedbacks
}


