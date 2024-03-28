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
                "mentor_ID": "1002",
                "task_completion_rate": 0.75,
                "attendance_rate": 0.95,
                "job_history": ["Software Engineer at ABC Inc.", "Intern at XYZ Corp."],
                "education": ["Bachelor's in Computer Science"],
                "certifications": ["AWS Certified Developer"],
                "courses_taken": ["Node.js Basics", "MongoDB Basics"],
                "workshops_taken": ["Angular Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "",
                "registered_status": true
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
                "mentor_ID": "1001",
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
            
            {
                "employeeID": "1003",
                "name": "Arbaaz Butt",
                "email": "arbaaz@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-1234567",
                "date_of_birth": new Date("1995-12-25"),
                "gender": "Male",
                "positionID": "P003",
                "skills": ["Financial Management", "Accounting", "Risk Management", "Leadership", "Python"], 
                "security_question": "What city were you born in?",
                "security_answer": "Lahore",
                "two_factor_answer": "8",
                "mentor_ID": "1001",
                "task_completion_rate": 0.98,
                "attendance_rate": 0.99,
                "job_history": ["Intern at Devsinc", "Junior Accountant at Devsinc", "Senior Accountant at Devsinc", "Accounting Manager at Devsinc", "CFO at Devsinc"],
                "education": ["BS in Accounting and Finance", "MBA in Finance"],
                "certifications": ["ACCA", "CFA Level 1", "CIMA"],
                "courses_taken": ["Leadership and Management", "HR Management", "Financial Management"],
                "workshops_taken": ["Leadership Workshop", "Finance Workshop"],
                "awards": ["Employee of the Year", "Best Accountant Award"],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1004",
                "name": "Abdul Rehman",
                "email": "abdul.rehman@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-2345678",
                "date_of_birth": new Date("1994-11-15"),
                "gender": "Male",
                "positionID": "P005",
                "skills": ["Software Development", "Team Management", "Project Management", "Leadership", "Problem Solving", "Communication", "Teamwork"],
                "security_question": "What is your favorite food?",
                "security_answer": "Biryani",
                "two_factor_answer": "2",
                "mentor_ID": "1003",
                "task_completion_rate": 0.90,
                "attendance_rate": 0.95,
                "job_history": ["Intern at Devsinc", "Junior Software Developer at Devsinc", "Software Developer at Devsinc", "Senior Software Developer at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["AWS Certified Developer", "Oracle Certified Professional"],
                "courses_taken": ["Software Development", "Project Management", "Team Management"],
                "workshops_taken": ["Software Development Workshop", "Leadership Workshop"],
                "awards": ["Employee of the Month", "Best Developer Award"],
                "profile_picture": "",
                "registered_status": true
            },

            {
                "employeeID": "1005",
                "name": "Sara Khan",
                "email": "sara@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-3456789",
                "date_of_birth": new Date("1996-10-20"),
                "gender": "Female",
                "positionID": "P005",
                "skills": ["Software Development", "Problem Solving", "Teamwork", "Leadership"],      
                "security_question": "What is your favorite movie?",
                "security_answer": "Inception",
                "two_factor_answer": "7",
                "mentor_ID": "1003",
                "task_completion_rate": 0.80,
                "attendance_rate": 0.90,
                "job_history": ["Intern at Devsinc", "Junior Software Developer at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Microsoft Certified Professional"],
                "courses_taken": ["Software Development", "Problem Solving", "Teamwork"],
                "workshops_taken": ["Software Development Workshop", "Problem Solving Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1008",
                "name": "Fatima Jinnah",
                "email": "fatima@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-4567890",
                "date_of_birth": new Date("1997-09-05"),
                "gender": "Female",
                "positionID": "P007",
                "skills": ["UI/UX Design", "Wireframing", "Prototyping", "User Research"],
                "security_question": "What is the name of your first pet?",
                "security_answer": "Tommy",
                "two_factor_answer": "1",
                "mentor_ID": "1002",
                "task_completion_rate": 0.95,
                "attendance_rate": 0.95,
                "job_history": ["Intern at Devsinc", "Junior UI/UX Designer at Devsinc"],
                "education": ["BS in Computer Science", "MS in HCI"],
                "certifications": ["Adobe Certified Expert"],
                "courses_taken": ["UI/UX Design", "Wireframing", "Prototyping"],
                "workshops_taken": [],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1010",
                "name": "Ali Zafar",
                "email": "ali.zafar@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-5678901",
                "date_of_birth": new Date("1998-08-10"),
                "gender": "Male",
                "positionID": "P009",
                "skills": ["Data Analysis", "Data Visualization", "SQL", "Python"],
                "security_question": "What is the name of your best friend?",
                "security_answer": "Ahmed",
                "two_factor_answer": "5",
                "mentor_ID": "1008",
                "task_completion_rate": 0.65,
                "attendance_rate": 0.75,
                "job_history": ["Intern at Devsinc", "Junior Data Analyst at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Tableau Certified Professional"],
                "courses_taken": ["Data Analysis", "Data Visualization", "SQL", "Python"],
                "workshops_taken": ["Python Workshop"],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1011",
                "name": "Pasha Patel",
                "email": "pasha@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-6789012",
                "date_of_birth": new Date("2000-07-15"),
                "gender": "Male",
                "positionID": "P010",
                "skills": ["Technical Support", "Troubleshooting", "Customer Service"],
                "security_question": "What is your favorite book?",
                "security_answer": "The Alchemist",
                "two_factor_answer": "6",
                "mentor_ID": "1010",
                "task_completion_rate": 0.70,
                "attendance_rate": 0.92,
                "job_history": ["IT Support Specialist at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["CompTIA A+"],
                "courses_taken": ["Technical Support", "Troubleshooting", "Customer Service"],
                "workshops_taken": ["Customer Service Workshop"],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1012",
                "name": "Batool Rizvi",
                "email": "batool@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-7890123",
                "date_of_birth": new Date("2001-06-20"),
                "gender": "Female",
                "positionID": "P011",
                "skills": [],
                "security_question": "What is your mother's maiden name?",
                "security_answer": "Maryam",
                "two_factor_answer": "1",
                "mentor_ID": "",
                "task_completion_rate": 0.65,
                "attendance_rate": 1,
                "job_history": ["Intern at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": [],
                "courses_taken": [],
                "workshops_taken": [],
                "awards": [],
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
                password: await hashPassword('abcd1234')
            },
            {
                adminID: 'A0002',
                name: 'Booshan Khan',
                email: 'booshan@devsinc.com',
                password: await hashPassword('q1w2e3r4')
            },
            {
                adminID: 'A0003',
                name: 'Alice Johnson',
                email: 'alice.johnson@devsinc.com',
                password: await hashPassword('password123')
            },
            {
                adminID: 'A0004',
                name: 'Bob Brown',
                email: 'bob.brown@lums.edu.pk',
                password: await hashPassword('password123')
            },
            {
                adminID: 'A0005',
                name: 'Eve Williams',
                email: 'eve.williams@example.com',
                password: await hashPassword('aaaaaaaa')
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
            // {
            //     "positionID": "P001",
            //     "title": "Software Engineer",
            //     "vacant": false,
            //     "required_skills": ["JavaScript", "Node.js", "MongoDB"],
            //     "held_by": ["E1001"]
            // },
            // {
            //     "positionID": "P002",
            //     "title": "Data Analyst",
            //     "vacant": false,
            //     "required_skills": ["Python", "Django", "SQL"],
            //     "held_by": ["E1002"]
            // },
            // {
            //     "positionID": "P003",
            //     "title": "Frontend Developer",
            //     "vacant": true,
            //     "required_skills": ["HTML", "CSS", "JavaScript"],
            //     "held_by": []
            // },
            {
                positionID: "P001",
                title: "CEO",
                vacant: false,
                required_skills: ["Leadership", "Strategic Planning", "Financial Management"],
                held_by: ["1001"],
                hierarchy_level: 1
            },
            {
                positionID: "P002",
                title: "CTO",
                vacant: false,
                required_skills: ["Technical Leadership", "Innovation", "Technology Strategy", "Product Development"],
                held_by: ["1002"],
                hierarchy_level: 1
            },
            {
                positionID: "P003",
                title: "CFO",
                vacant: false,
                required_skills: ["Financial Management", "Accounting", "Risk Management"],
                held_by: ["1003"],
                hierarchy_level: 1
            },
            {
                positionID: "P004",
                title: "Software Development Manager",
                vacant: true,
                required_skills: ["Software Development", "Team Management", "Project Management"],
                held_by: [],
                hierarchy_level: 2
            },
            {
                positionID: "P005",
                title: "Senior Software Engineer",
                vacant: false,
                required_skills: ["Software Development", "Problem Solving", "Communication", "Teamwork", "Leadership"],
                held_by: ["1004", "1005"],
                hierarchy_level: 3
            },
            {
                positionID: "P006",
                title: "Senior Data Analyst",
                vacant: true,
                required_skills: ["Data Analysis", "Data Visualization", "SQL", "Python"],
                held_by: [],
                hierarchy_level: 3
            },
            {
                positionID: "P007",
                title: "Senior UI/UX Designer",
                vacant: false,
                required_skills: ["UI/UX Design", "Wireframing", "Prototyping", "User Research"],
                held_by: ["1008"],
                hierarchy_level: 3
            }, 
            {
                positionID: "P008",
                title: "Junior Software Developer",
                vacant: true,
                required_skills: ["Software Development", "Problem Solving", "Communication", "Teamwork"],
                held_by: [],
                hierarchy_level: 4
            },
            {
                positionID: "P009",
                title: "Junior Data Analyst",
                vacant: false,
                required_skills: ["Data Analysis", "Data Visualization", "SQL", "Python"],
                held_by: ["1010"],
                hierarchy_level: 4
            },
            {
                positionID: "P010",
                title: "IT Support Specialist",
                vacant: false,
                required_skills: ["Technical Support", "Troubleshooting", "Customer Service"],
                held_by: ["1011"],
                hierarchy_level: 5
            },
            {
                positionID: "P011",
                title: "Intern",
                vacant: false,
                required_skills: [],
                held_by: ["1012"],
                hierarchy_level: 6
            }
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