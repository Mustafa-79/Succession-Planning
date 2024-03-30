const mongoose = require('mongoose');
const Employee = require('./models/employee');
const HR_Admin = require('./models/hr_admin')
const Feedback = require('./models/feedback')
const Workshop = require('./models/workshop')
const Course = require('./models/course')
const Positions = require('./models/positions')
const { hashPassword } = require('./helpers/auth');

async function init_db(conn) {
    const db = conn;

    db.once('open', async () => {
        try {
            await Promise.all([
                db.collection('employees').deleteMany(),
                db.collection('hr_admins').deleteMany(),
                db.collection('feedbacks').deleteMany(),
                db.collection('workshops').deleteMany(),
                db.collection('courses').deleteMany(),
                db.collection('positions').deleteMany(),
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
                "password": await hashPassword("password123"),
                "contactNumber": "123-456-7890",
                // "age": 30,
                "date_of_birth": new Date("1991-04-10"),
                "gender": "Male",
                "positionID": "P001",
                "skills": ["JavaScript", "Node.js", "MongoDB"],
                "security_question": "What is your favorite color?", // for password reset
                "security_answer": "Blue", // for password reset
                "two_factor_answer": "3", // 3 is lightbulb
                "mentor_ID": "2001",
                "task_completion_rate": 0.75,
                "attendance_rate": 0.95,
                "job_history": ["Software Engineer at ABC Inc.", "Intern at XYZ Corp."],
                "education": ["Bachelor's in Computer Science"],
                "certifications": ["AWS Certified Developer"],
                "courses_taken": ["Node.js Basics", "MongoDB Basics"],
                "workshops_taken": ["Angular Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "",
                "registered_status": true,
                "about": 'I am king'
            },

            {
                "employeeID": "1002",
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "password": await hashPassword("securepassword"),
                "contactNumber": "987-654-3210",
                // "age": 28,
                "date_of_birth": new Date("1993-07-15"),
                "gender": "Female",
                "positionID": "P002",
                "skills": ["Python", "Django", "SQL"],
                "security_question": "What is your mother's maiden name?",
                "security_answer": "Johnson",
                "two_factor_answer": "10",
                "mentor_ID": "2002",
                "task_completion_rate": 0.85,
                "attendance_rate": 0.98,
                "job_history": ["Data Analyst at XYZ Corp.", "Intern at PQR Ltd."],
                "education": ["Master's in Data Science"],
                "certifications": ["Google Analytics Certified"],
                "workshops_taken": ["Data Visualization Workshop"],
                "awards": ["Best Newcomer Award"],
                "profile_picture": "",
                "registered_status": true
            },
            // {
            //     "employeeID": "1003",
            //     "name": "Arbaaz Butt",
            //     "positionID": "P002",
            //     "registered_status": false,
            // },
            // {
            //     "employeeID": "1004",
            //     "name": "Shera",
            //     "positionID": "P001",
            //     "registered_status": false,
            // }
        ];

        const AdminsData = [
            {
                adminID: 'A0001',
                name: 'Muhammad Ali',
                email: 'muhammad@devsinc.com',
                contactNumber: "123-456-7890",
                password: await hashPassword('abcd1234'),
                gender: 'Male',
                profile_picture: ""
            },
            {
                adminID: 'A0002',
                name: 'Booshan Khan',
                email: 'booshan@devsinc.com',
                contactNumber: "987-654-3210",
                password: await hashPassword('q1w2e3r4'),
                gender: 'Male',
                profile_picture: ""
            },
            {
                adminID: 'A0003',
                name: 'Alice Johnson',
                email: 'alice.johnson@devsinc.com',
                contactNumber: "123-456-7890",
                password: await hashPassword('password123'),
                gender: 'Female',
                profile_picture: ""
            },
            {
                adminID: 'A0004',
                name: 'Bob Brown',
                email: 'bob.brown@lums.edu.pk',
                contactNumber: "987-654-3210",
                password: await hashPassword('password123'),
                gender: 'Male',
                profile_picture: ""
            },
            {
                adminID: 'A0005',
                name: 'Eve Williams',
                email: 'eve.williams@example.com',
                contactNumber: "987-654-3232",
                password: await hashPassword('aaaaaaaa'),
                gender: 'Female',
                profile_picture: ""
            },
        ];

        const FeedbacksData = [
            {
                feedbackID: 'F0001',
                employeeID: 'E1001',
                feedback: 'Great work!',
                date: new Date('2024-03-01T08:00:00Z'),
            },
            {
                feedbackID: 'F0002',
                employeeID: 'E1001',
                feedback: 'Needs improvement.',
                date: new Date('2024-03-02T08:00:00Z'),
            },
            {
                feedbackID: 'F0003',
                employeeID: 'E1001',
                feedback: 'Excellent job!',
                date: new Date('2024-03-03T08:00:00Z'),
            },
            {
                feedbackID: 'F0004',
                employeeID: 'E1002',
                feedback: 'Keep up the good work!',
                date: new Date('2024-03-04T08:00:00Z'),
            },
            {
                feedbackID: 'F0005',
                employeeID: 'E1002',
                feedback: 'Well done!',
                date: new Date('2024-03-05T08:00:00Z'),
            },
        ];

        const WorkshopsData = [
            {
                "workshopID": "W001",
                "title": "Angular Workshop",
                "date": new Date("2024-03-01T08:00:00Z"),
                "description": "Learn Angular from scratch."
            },
            {
                "workshopID": "W002",
                "title": "Data Visualization Workshop",
                "date": new Date("2024-03-02T08:00:00Z"),
                "description": "Learn to visualize data using Python libraries."
            },
            {
                "workshopID": "W003",
                "title": "React Workshop",
                "date": new Date("2024-03-03T08:00:00Z"),
                "description": "Learn React basics."
            },
        ];

        const CoursesData = [
            {
                "courseID": "C001",
                "title": "Node.js Basics",
                "start_date": new Date("2024-03-01T08:00:00Z"),
                "duration": 5,
                "description": "Learn Node.js basics."
            },
            {
                "courseID": "C002",
                "title": "MongoDB Basics",
                "start_date": new Date("2024-03-02T08:00:00Z"),
                "duration": 7,
                "description": "Learn MongoDB basics."
            },
            {
                "courseID": "C003",
                "title": "Python Basics",
                "start_date": new Date("2024-03-03T08:00:00Z"),
                "duration": 10,
                "description": "Learn Python basics."
            },
        ];

        const PositionsData = [
            {
                "positionID": "P001",
                "title": "Software Engineer",
                "vacant": false,
                "required_skills": ["JavaScript", "Node.js", "MongoDB"],
                "held_by": ["E1001"]
            },
            {
                "positionID": "P002",
                "title": "Data Analyst",
                "vacant": false,
                "required_skills": ["Python", "Django", "SQL"],
                "held_by": ["E1002"]
            },
            {
                "positionID": "P003",
                "title": "Frontend Developer",
                "vacant": true,
                "required_skills": ["HTML", "CSS", "JavaScript"],
                "held_by": []
            },
        ];


        // Save employee data to the database
        await Promise.all([
            Employee.insertMany(employeeData),
            HR_Admin.insertMany(AdminsData),
            Feedback.insertMany(FeedbacksData),
            Workshop.insertMany(WorkshopsData),
            Course.insertMany(CoursesData),
            Positions.insertMany(PositionsData),
        ]);

        console.log('Employee data saved to database')
    } catch (error) {
        console.error('Error saving data to database:', error);
    }
}


module.exports = init_db;