const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeID : String,
    name : String,
    email :{
        type: String,
        unique: true
    employeeID : {
        type:String,
        unique: true 
    },
    name : String,
    email : String,
    password : String,
    contactNumber : String,
    age : Number,
    gender : String,
    positionID : String,
    security_question : String,
    security_answer : String,
    two_factor_answer : Number,
    mentor_ID : String,
    task_completion_rate : Number,
    attendance_rate : Number,
    job_history : [String],
    education : [String],
    certifications : [String],
    awards : [String],
    workshops_taken : [String],
    courses_taken : [String],
    assessement_results : [String],
    profile_picture : String,
});

const EmployeeModel = mongoose.model('Employee', employeeSchema)

module.exports = EmployeeModel;