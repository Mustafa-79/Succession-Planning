const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeID : String,
    name : String,
    email :{
        type: String,
        unique: true
    },
    password : String,
    contactNumber : String,
    age : Number,
    positionID : String,
    skills : [String],
    two_factor_question : String,
    two_factor_answer : String,
    mentor_ID : String,
    task_completion_rate : Number,
    attendance_rate : Number,
    job_history : [String],
    education : [String],
    certifications : [String],
    awards : [String],
    profile_picture : String,
});

const EmployeeModel = mongoose.model('Employee', employeeSchema)

module.exports = EmployeeModel;