
const User = require('../models/users')
const Employee = require('../models/employee')
const Position = require('../models/positions')
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

const positionIDtoName = async (reqs, resp) => {
    try {
        const positions = await Position.find()
        return resp.json(positions)
    }
    catch (error) {
        console.log(error)
    }
}

const addEmployeeFromAdminDashboard = async (reqs, resp) => {
    try {
        // i got employeeID, name, positionID, and registered_status from the request
        const { employeeID, name, positionID, registered_status } = reqs.body
        const newEmployee = new Employee({
            employeeID,
            name,
            positionID,
            registered_status
        })
        await newEmployee.save()
        return resp.json({ message: "Employee added successfully" })
    }
    catch (error) {
        console.log(error)
    }
}

const deleteEmployeefromAdminDashboard = async (reqs, resp) => {
    try {
        console.log(reqs)
        const employeeID = reqs.params.id;
        const deletedEmployee = await Employee.findOneAndDelete({ employeeID: employeeID });

        if (!deletedEmployee) {
            return resp.status(400).json({ message: "Employee not found" })
        }
        return resp.json({ message: "Employee deleted successfully" })
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {
    dashboardEmployees,
    positionIDtoName,
    addEmployeeFromAdminDashboard,
    deleteEmployeefromAdminDashboard
}


