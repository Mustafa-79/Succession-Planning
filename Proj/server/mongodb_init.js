const mongoose = require('mongoose');
const Employee = require('./models/employee');

async function init_db(conn) {
    const db = conn;

    db.once('open', async () => {
        try {
            await Promise.all([
                db.collection('employees').deleteMany()
            ]);
            console.log('Database initialized');
    } catch (err) {
        console.error("Error clearing database:", err);
    }
});

    try {
        const employeeData = [
            {
                "employeeID": "1001",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "password123",
                "contactNumber": "123-456-7890",
                "age": 30,
                "gender": "Male",
                "positionID": "P001",
                "skills": ["JavaScript", "Node.js", "MongoDB"],
                "security_question": "What is your favorite color?", // for password reset
                "secuirty_answer": "Blue", // for password reset
                "two_factor_answer": "3", // for two-factor authentication
                "mentor_ID": "2001",
                "task_completion_rate": 0.75,
                "attendance_rate": 0.95,
                "job_history": ["Software Engineer at ABC Inc.", "Intern at XYZ Corp."],
                "education": ["Bachelor's in Computer Science"],
                "certifications": ["AWS Certified Developer"],
                "courses_taken": ["Node.js Basics", "MongoDB Basics"],
                "workshops_taken": ["Angular Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "https://example.com/profile.jpg"
            },

            {
                "employeeID": "1002",
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "password": "securepassword",
                "contactNumber": "987-654-3210",
                "age": 28,
                "gender": "Female",
                "positionID": "P002",
                "skills": ["Python", "Django", "SQL"],
                "security_question": "What is your mother's maiden name?",
                "security_answer": "Johnson",
                "two_factor_answer": "0",
                "mentor_ID": "2002",
                "task_completion_rate": 0.85,
                "attendance_rate": 0.98,
                "job_history": ["Data Analyst at XYZ Corp.", "Intern at PQR Ltd."],
                "education": ["Master's in Data Science"],
                "certifications": ["Google Analytics Certified"],
                "workshops_taken": ["Data Visualization Workshop"],
                "awards": ["Best Newcomer Award"],
                "profile_picture": "https://example.com/profile2.jpg"
            }
        ];
        
        // Save employee data to the database
        await Promise.all([
            Employee.insertMany(employeeData)
        ]);

        console.log('Employee data saved to database')
    } catch (error) {
        console.error('Error saving data to database:', error);
    }
}


module.exports = init_db;