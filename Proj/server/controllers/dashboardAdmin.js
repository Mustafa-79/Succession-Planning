
const User = require('../models/users')
const Employee = require('../models/employee')
const Position = require('../models/positions')
const Course = require('../models/course')
const Workshop = require('../models/workshop')
const HR_Admin = require('../models/hr_admin')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// Get all employees for admin dashboard
const dashboardEmployees = async (reqs, resp) => {
    try {
        const employees = await Employee.find()
        return resp.json(employees)
    } catch (error) {
        console.log(error)
    }
}

// Return all data about positions
const positionIDtoName = async (reqs, resp) => {
    try {
        const positions = await Position.find()
        return resp.json(positions)
    }
    catch (error) {
        console.log(error)
    }
}

// ENdpoint to allow HR Admin to add new employee to database
const addEmployeeFromAdminDashboard = async (reqs, resp) => {
    try {
        // got employeeID, name, positionID, and registered_status from the request
        const { employeeID, name, positionID, registered_status, email } = reqs.body
        // Make a new object
        const newEmployee = new Employee({
            employeeID,
            name,
            positionID,
            registered_status,
            email
        })
        // Save to DB
        await newEmployee.save()
        return resp.json({ message: "Employee added successfully" })
    }
    catch (error) {
        console.log(error)
    }
}

// Endpoint for HR Admin to fire an emplyee 
const deleteEmployeefromAdminDashboard = async (reqs, resp) => {
    try {
        console.log(reqs)
        // Get the employee's ID
        const employeeID = reqs.params.id;
        // Delete from the DB
        const deletedEmployee = await Employee.findOneAndDelete({ employeeID: employeeID });

        // If no employee was deleted, i.e. wrong emplyee ID, return error
        if (!deletedEmployee) {
            return resp.status(400).json({ message: "Employee not found" })
        }
        // return success message
        return resp.json({ message: "Employee deleted successfully" })
    }
    catch (error) {
        console.log(error)
    }
}

const fetchCourses = async (reqs,resp) => {
    try {
        const courses = await Course.find()
        return resp.json(courses)
    }

    catch(error){
        console.log(error)
    }
}

const fetchWorkshops = async (reqs,resp) => {
    try {
        const workshops = await Workshop.find()
        return resp.json(workshops)
    }

    catch(error){
        console.log(error)
    }
}


const returnAdminProfile = async (reqs, resp) => {
    try {
        const {name} = reqs.body;

        const exists = await HR_Admin.findOne({name: name})

        if (!exists) {
            return resp.json({
                error: 'No such employee record exists'
            }) 
        } else {
            resp.json(exists)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    dashboardEmployees,
    positionIDtoName,
    addEmployeeFromAdminDashboard,
    deleteEmployeefromAdminDashboard,
    fetchCourses,
    fetchWorkshops,
    returnAdminProfile
}


