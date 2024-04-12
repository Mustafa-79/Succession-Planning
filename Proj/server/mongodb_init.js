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

                "task_completion_rate": 0.85,
                "attendance_rate": 0.95,
                "punctuality": 0.93,
                "efficiency": 0.89,
                "professionalism": 0.97,
                "collaboration": 0.98,
                "leadership": 0.95,

                "job_history": ["Software Engineer at ABC Inc.", "Intern at XYZ Corp."],
                "education": ["Bachelor's in Computer Science"],
                "certifications": ["AWS Certified Developer"],
                "courses_taken": ["Node.js Basics", "MongoDB Basics","Strategic Planning Course","Machine Learning Course", "Agile Development Course","Public Speaking Course"],
                "workshops_taken": ["Leadership Seminar","Financial Management Workshop","Project Management Workshop","Digital Marketing Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "",
                "registered_status": true,
                "about": 'I am king',
                "is_blocked": false,
                "failed_attempts": 0
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
                "punctuality": 0.99,
                "efficiency": 0.92,
                "professionalism": 0.92,
                "collaboration": 0.99,
                "leadership": 0.99,

                "job_history": ["Data Analyst at XYZ Corp.", "Intern at PQR Ltd."],
                "education": ["Master's in Data Science"],
                "certifications": ["Google Analytics Certified"],
                
                "courses_taken": ["Node.js Basics", "MongoDB Basics","Strategic Planning Course","Machine Learning Course", "Agile Development Course","Public Speaking Course","Digital Marketing Course","Public Speaking Course"],

                "workshops_taken": ["Leadership Seminar","Financial Management Workshop","Project Management Workshop","Digital Marketing Workshop"],
                
                "awards": ["Best Newcomer Award"],
                "profile_picture": "",
                "registered_status": true,
                "is_blocked": true
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
                "punctuality": 1,
                "efficiency": 1,
                "professionalism": 1,
                "collaboration": 1,
                "leadership": 1,

                "job_history": ["Intern at Devsinc", "Junior Accountant at Devsinc", "Senior Accountant at Devsinc", "Accounting Manager at Devsinc", "CFO at Devsinc"],
                "education": ["BS in Accounting and Finance", "MBA in Finance"],
                "certifications": ["ACCA", "CFA Level 1", "CIMA"],
                
                "courses_taken": ["Strategic Planning Course","Public Speaking Course","Public Speaking Course","Financial Analysis Course"],

                "workshops_taken": [ "Financial Management Workshop"],

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

                "punctuality": 0.85,
                "efficiency": 0.78,
                "professionalism": 0.79,
                "collaboration": 0.88,
                "leadership": 0.95,

                "job_history": ["Intern at Devsinc", "Junior Software Developer at Devsinc", "Software Developer at Devsinc", "Senior Software Developer at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["AWS Certified Developer", "Oracle Certified Professional"],
                "courses_taken": ["Node.js Basics","MongoDB Basics","Python Basics","SEO Course","Public Speaking Course","Financial Analysis Course"],
                "workshops_taken": ["Angular Workshop","Python for Data Analysis Workshop","Digital Marketing Workshop","Leadership Seminar"],
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

                "punctuality": 0.81,
                "efficiency": 0.79,
                "professionalism": 0.82,
                "collaboration": 0.71,
                "leadership": 0.85,

                "job_history": ["Intern at Devsinc", "Junior Software Developer at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Microsoft Certified Professional"],
                "courses_taken": ["Node.js Basics","MongoDB Basics","Python Basics","SEO Course","Strategic Planning Course","Public Speaking Course","Financial Analysis Course"],
                "workshops_taken": ["Angular Workshop","Python for Data Analysis Workshop","Digital Marketing Workshop"],
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

                "punctuality": 0.99,
                "efficiency": 0.98,
                "professionalism": 0.97,
                "collaboration": 0.96,
                "leadership": 0.75,

                "job_history": ["Intern at Devsinc", "Junior UI/UX Designer at Devsinc"],
                "education": ["BS in Computer Science", "MS in HCI"],
                "certifications": ["Adobe Certified Expert"],
                "courses_taken": ["Node.js Basics","MongoDB Basics","Python Basics","SEO Course","Strategic Planning Course","Public Speaking Course","Financial Analysis Course", "UI/UX Design Masterclass","UX Research Course"],
                "workshops_taken": ["Python for Data Analysis Workshop","UI/UX Design Thinking Workshop"],
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

                "punctuality": 0.72,
                "efficiency": 0.68,
                "professionalism": 0.70,
                "collaboration": 0.65,
                "leadership": 0.60,

                "job_history": ["Intern at Devsinc", "Junior Data Analyst at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Tableau Certified Professional"],
                "courses_taken": ["Public Speaking Course","Financial Analysis Course", ,"UX Research Course","Data Science Course"],
                "workshops_taken": ["Python for Data Analysis Workshop"],
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

                "punctuality": 0.85,
                "efficiency": 0.73,
                "professionalism": 0.92,
                "collaboration": 0.90,
                "leadership": 0.84,

                "job_history": ["IT Support Specialist at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["CompTIA A+"],
                "courses_taken": ["Public Speaking Course","Strategic Planning Course", ,"UX Research Course","Data Science Course"],
                "workshops_taken": ["Python for Data Analysis Workshop","SEO Workshop"],
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

                "punctuality": 1,
                "efficiency": 0.73,
                "professionalism": 0.75,
                "collaboration": 0.65,
                "leadership": 0.63,

                "job_history": ["Intern at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": [],
                "courses_taken": [],
                "workshops_taken": [],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1013",
                "name": "Zubair Ahmed",
                "email": "zubair@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0300-8901234",
                "date_of_birth": new Date("1989-12-25"),
                "gender": "Male",
                "positionID": "P005",
                "skills": ["Software Development", "Problem Solving", "Teamwork", "Leadership"],
                "security_question": "What is your favorite movie?",
                "security_answer": "The Dark Knight",
                "two_factor_answer": "7",
                "mentor_ID": "",
                "task_completion_rate": 0.87,
                "attendance_rate": 0.99,

                "punctuality": 0.98,
                "efficiency": 0.86,
                "professionalism": 0.79,
                "collaboration": 0.88,
                "leadership": 0.71,

                "job_history": ["Intern at Arbisoft", "Junior Software Developer at Arbisoft", "Software Developer at Devsinc", "Senior Software Developer at Devsinc"],
                "education": ["BS in Computer Science", "MS in Data Science"],
                "certifications": ["Google Certified Professional Cloud Architect", "Microsoft Certified: Azure Solutions Architect Expert"],
                "courses_taken": ["Node.js Basics","MongoDB Basics","Python Basics","SEO Course","Public Speaking Course",  "Strategic Planning Course"],
                "workshops_taken": ["Angular Workshop","Python for Data Analysis Workshop","Digital Marketing Workshop","Leadership Seminar"],
                "awards": ["Employee of the Month", "Employee of the Year"],
                "profile_picture": "",
                "registered_status": true
            },

            {
                "employeeID": "1014",
                "name": "Sana Malik",
                "email": "sana.malik@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-2345678",
                "date_of_birth": new Date("1992-11-15"),
                "gender": "Female",
                "positionID": "P007",
                "skills": ["UI/UX Design", "User Research", "Teamwork", "Leadership"],
                "security_question": "What is your mother's maiden name?",
                "security_answer": "Abiha",
                "two_factor_answer": "4",
                "mentor_ID": "",
                "task_completion_rate": 0.97,
                "attendance_rate": 0.98,

                "punctuality": 0.92,
                "efficiency": 0.89,
                "professionalism": 0.45,
                "collaboration": 0.88,
                "leadership": 0.59,

                "job_history": ["Intern at Devsinc", "Junior UI/UX Designer at Devsinc"],
                "education": ["BS in Computer Science", "MS in HCI"],
                "certifications": [],
                "courses_taken": ["SEO Course","Strategic Planning Course","Public Speaking Course","Financial Analysis Course", "UI/UX Design Masterclass","UX Research Course"],
                "workshops_taken": ["Python for Data Analysis Workshop"],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1015",
                "name": "Turab Waheed",
                "email": "turab@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-3334444",
                "date_of_birth": new Date("1993-12-25"),
                "gender": "Male",
                "positionID": "P008",
                "skills": ["Software Development", "Problem Solving", "Teamwork", "Communication"],
                "security_question": "What city were you born in?",
                "security_answer": "Islamabad",
                "two_factor_answer": "3",
                "mentor_ID": "1013",

                "task_completion_rate": 0.80,
                "attendance_rate": 0.88,
                "punctuality": 0.91,
                "efficiency": 0.89,
                "professionalism": 0.92,
                "collaboration": 0.85,
                "leadership": 0.81,

                // w1 * KPI1 + w2 * KPI2 + w3 * KPI3 + w4 * KPI4 + w5 * KPI5 + w6 * KPI6
                // calculate for each employee
                // Sort employees based on this score to get the ranking

                "job_history": ["Intern at Systems Ltd.", "Junior Software Developer at Systems Ltd.", "Junior Software Developer at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Meta Certified Developer"],
                "courses_taken": ["Software Development", "Problem Solving", "Teamwork", "Communication"],
                "workshops_taken": ["Software Development Workshop", "Problem Solving Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1016",
                "name": "Fahad Mehmood",
                "email": "fahad@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-4445555",
                "date_of_birth": new Date("2000-02-20"),
                "gender": "Male",
                "positionID": "P008",
                "skills": ["Software Development", "Problem Solving", "Teamwork", "Communication"],
                "security_question": "What is the name of your best friend?",
                "security_answer": "Ali",
                "two_factor_answer": "5",
                "mentor_ID": "1014",

                "task_completion_rate": 0.69,
                "attendance_rate": 0.79,
                "punctuality": 0.71,
                "efficiency": 0.68,
                "professionalism": 0.92,
                "collaboration": 0.75,
                "leadership": 0.80,

                "job_history": ["IT Support Specialist at Devsinc", "Junior Software Developer at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["CompTIA A+"],
                "courses_taken": ["Node.js Basics","MongoDB Basics", "Strategic Planning Course"],
                "workshops_taken": ["Angular Workshop"],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1017",
                "name": "Samiya Iqbal",
                "email": "samiya@;ums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-5556666",
                "date_of_birth": new Date("1994-03-02"),
                "gender": "Female",
                "positionID": "P009",
                "skills": ["Data Analysis", "Data Visualization", "SQL", "Python"],
                "security_question": "What is your favorite book?",
                "security_answer": "To Kill a Mockingbird",
                "two_factor_answer": "2",
                "mentor_ID": "1005",
                "task_completion_rate": 0.96,
                "attendance_rate": 1,

                "punctuality": 0.93,
                "efficiency": 0.89,
                "professionalism": 0.97,
                "collaboration": 0.98,
                "leadership": 0.95,

                "job_history": ["Intern at Wavetec", "Junior Data Analyst at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Tableau Certified Professional"],
                "courses_taken": ["Node.js Basics","MongoDB Basics","Python Basics","SEO Course","UI/UX Design Masterclass"],
                "workshops_taken": ["UI/UX Design Thinking Workshop"],
                "awards": ["Employee of the Month"],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1018",
                "name": "Omar Farooq",
                "email": "omar@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-6667777",
                "date_of_birth": new Date("2001-04-10"),
                "gender": "Male",
                "positionID": "P010",
                "skills": ["Technical Support", "Troubleshooting", "Customer Service"],
                "security_question": "What is your favorite movie?",
                "security_answer": "The Matrix",
                "two_factor_answer": "9",
                "mentor_ID": "1017",
                "task_completion_rate": 0.71,
                "attendance_rate": 0.75,

                "punctuality": 0.78,
                "efficiency": 0.75,
                "professionalism": 0.80,
                "collaboration": 0.90,
                "leadership": 0.81,

                "job_history": ["IT Support Specialist at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": ["Oracle Certified Professional"],
                "courses_taken": ["Node.js Basics","MongoDB Basics"],
                "workshops_taken": ["Python for Data Analysis Workshop"],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1019",
                "name": "Danish Chaudhry",
                "email": "danish@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-7778888",
                "date_of_birth": new Date("2003-11-05"),
                "gender": "Male",
                "positionID": "P011",
                "skills": [],
                "security_question": "What is your favorite movie?",
                "security_answer": "Avengers: Endgame",
                "two_factor_answer": "10",
                "mentor_ID": "",
                "task_completion_rate": 0.85,
                "attendance_rate": 0.90,

                "punctuality": 0.89,
                "efficiency": 0.89,
                "professionalism": 0.97,
                "collaboration": 0.82,
                "leadership": 0.75,

                "job_history": ["Intern at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": [],
                "courses_taken": [],
                "workshops_taken": [],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },
            {
                "employeeID": "1020",
                "name": "Rabia Javed",
                "email": "rabia@lums.edu.pk",
                "password": await hashPassword("Abc1234."),
                "contactNumber": "0311-8889999",
                "date_of_birth": new Date("2002-08-10"),
                "gender": "Female",
                "positionID": "P011",
                "skills": [],
                "security_question": "What city were you born in?",
                "security_answer": "Karachi",
                "two_factor_answer": "8",
                "mentor_ID": "",
                "task_completion_rate": 0.75,
                "attendance_rate": 0.81,

                "punctuality": 0.93,
                "efficiency": 0.89,
                "professionalism": 0.66,
                "collaboration": 0.76,
                "leadership": 0.69,

                "job_history": ["Intern at Devsinc"],
                "education": ["BS in Computer Science"],
                "certifications": [],
                "courses_taken": [],
                "workshops_taken": [],
                "awards": [],
                "profile_picture": "",
                "registered_status": true
            },


            {
                "employeeID": "1021",
                "name": "Shera",
                "positionID": "P011",
                "registered_status": false,
            },
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
                courseID: "C013",
                rating: 2,
                employeeID: 'E1001',
                feedback: 'Great work! The course was very useful for me. It helped me in learning new skills and applying them effectively in my daily tasks. I especially appreciated the practical examples and hands-on projects.',
                date: new Date('2024-03-01T08:00:00Z'),
            },
            {
                feedbackID: 'F0002',
                courseID: "C013",
                rating: 2,
                employeeID: 'E1001',
                feedback: 'Needs improvement. The course content was somewhat outdated, and the examples used didn’t quite match the current industry standards. Additionally, the pacing was a bit off, with some sections moving too quickly.',
                date: new Date('2024-03-02T08:00:00Z'),
            },
            {
                feedbackID: 'F0003',
                courseID: "C013",
                rating: 3,
                employeeID: 'E1002',
                feedback: 'Keep up the good work! This course has a lot of potentials. I found the modules on advanced topics particularly insightful. However, it would be beneficial to update some of the earlier sections with more current information.',
                date: new Date('2024-03-04T08:00:00Z'),
            },
            {
                feedbackID: 'F0004',
                courseID: "C013",
                rating: 5,
                employeeID: 'E1002',
                feedback: 'Well done! This course exceeded my expectations with its depth and breadth of topics covered. The instructors were knowledgeable and engaging, making complex topics easy to understand.',
                date: new Date('2024-03-05T08:00:00Z'),
            }
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
            {
                "workshopID": "W004",
                "title": "Leadership Seminar",
                "date": new Date("2024-03-04T08:00:00Z"),
                "description": "Enhance your leadership skills."
            },
            {
                "workshopID": "W005",
                "title": "Financial Management Workshop",
                "date": new Date("2024-03-05T08:00:00Z"),
                "description": "Learn financial management strategies."
            },
            {
                "workshopID": "W006",
                "title": "Python for Data Analysis Workshop",
                "date": new Date("2024-03-06T08:00:00Z"),
                "description": "Explore data analysis with Python."
            },
            {
                "workshopID": "W007",
                "title": "UI/UX Design Thinking Workshop",
                "date": new Date("2024-03-07T08:00:00Z"),
                "description": "Master design thinking techniques."
            },
            {
                "workshopID": "W008",
                "title": "Project Management Workshop",
                "date": new Date("2024-03-08T08:00:00Z"),
                "description": "Learn effective project management."
            },
            {
                "workshopID": "W009",
                "title": "Digital Marketing Workshop",
                "date": new Date("2024-03-09T08:00:00Z"),
                "description": "Learn digital marketing strategies."
            },
            {
                "workshopID": "W010",
                "title": "Cybersecurity Workshop",
                "date": new Date("2024-03-10T08:00:00Z"),
                "description": "Understand cybersecurity fundamentals."
            },
            {
                "workshopID": "W011",
                "title": "Machine Learning Workshop",
                "date": new Date("2024-03-11T08:00:00Z"),
                "description": "Introduction to machine learning concepts."
            },
            {
                "workshopID": "W012",
                "title": "Agile Development Workshop",
                "date": new Date("2024-03-12T08:00:00Z"),
                "description": "Learn Agile development methodologies."
            },
            {
                "workshopID": "W013",
                "title": "Ethical Hacking Workshop",
                "date": new Date("2024-03-13T08:00:00Z"),
                "description": "Understand ethical hacking techniques."
            },
            {
                "workshopID": "W014",
                "title": "Public Speaking Workshop",
                "date": new Date("2024-03-14T08:00:00Z"),
                "description": "Improve your public speaking skills."
            },
            {
                "workshopID": "W015",
                "title": "Artificial Intelligence Workshop",
                "date": new Date("2024-03-15T08:00:00Z"),
                "description": "Introduction to artificial intelligence."
            },
            {
                "workshopID": "W016",
                "title": "Blockchain Workshop",
                "date": new Date("2024-03-16T08:00:00Z"),
                "description": "Understanding blockchain technology."
            },
            {
                "workshopID": "W017",
                "title": "Cloud Computing Workshop",
                "date": new Date("2024-03-17T08:00:00Z"),
                "description": "Introduction to cloud computing."
            },
            {
                "workshopID": "W018",
                "title": "SEO Workshop",
                "date": new Date("2024-03-18T08:00:00Z"),
                "description": "Master search engine optimization."
            },
            {
                "workshopID": "W019",
                "title": "Data Science Workshop",
                "date": new Date("2024-03-19T08:00:00Z"),
                "description": "Introduction to data science."
            },
            {
                "workshopID": "W020",
                "title": "UX Research Workshop",
                "date": new Date("2024-03-20T08:00:00Z"),
                "description": "Learn user experience research techniques."
            }
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
            {
                "courseID": "C004",
                "title": "Strategic Planning Course",
                "start_date": new Date("2024-03-04T08:00:00Z"),
                "duration": 7,
                "description": "Learn strategic planning techniques."
            },
            {
                "courseID": "C005",
                "title": "UI/UX Design Masterclass",
                "start_date": new Date("2024-03-05T08:00:00Z"),
                "duration": 14,
                "description": "Master UI/UX design principles."
            },
            {
                "courseID": "C006",
                "title": "Financial Analysis Course",
                "start_date": new Date("2024-03-06T08:00:00Z"),
                "duration": 10,
                "description": "Learn financial analysis techniques."
            },
            {
                "courseID": "C007",
                "title": "Advanced Data Visualization Course",
                "start_date": new Date("2024-03-07T08:00:00Z"),
                "duration": 14,
                "description": "Advance your data visualization skills."
            },
            {
                "courseID": "C008",
                "title": "Leadership Development Program",
                "start_date": new Date("2024-03-08T08:00:00Z"),
                "duration": 21,
                "description": "Develop leadership qualities and skills."
            },
            {
                "courseID": "C009",
                "title": "Digital Marketing Course",
                "start_date": new Date("2024-03-09T08:00:00Z"),
                "duration": 14,
                "description": "Master digital marketing strategies."
            },
            {
                "courseID": "C010",
                "title": "Cybersecurity Course",
                "start_date": new Date("2024-03-10T08:00:00Z"),
                "duration": 21,
                "description": "Understand cybersecurity principles."
            },
            {
                "courseID": "C011",
                "title": "Machine Learning Course",
                "start_date": new Date("2024-03-11T08:00:00Z"),
                "duration": 21,
                "description": "Explore machine learning algorithms."
            },
            {
                "courseID": "C012",
                "title": "Agile Development Course",
                "start_date": new Date("2024-03-12T08:00:00Z"),
                "duration": 14,
                "description": "Learn Agile development methodologies."
            },
            {
                "courseID": "C013",
                "title": "Ethical Hacking Course",
                "start_date": new Date("2024-03-13T08:00:00Z"),
                "duration": 21,
                "description": "Understand ethical hacking techniques."
            },
            {
                "courseID": "C014",
                "title": "Public Speaking Course",
                "start_date": new Date("2024-03-14T08:00:00Z"),
                "duration": 10,
                "description": "Improve your public speaking skills."
            },
            {
                "courseID": "C015",
                "title": "Artificial Intelligence Course",
                "start_date": new Date("2024-03-15T08:00:00Z"),
                "duration": 21,
                "description": "Introduction to artificial intelligence."
            },
            {
                "courseID": "C016",
                "title": "Blockchain Course",
                "start_date": new Date("2024-03-16T08:00:00Z"),
                "duration": 21,
                "description": "Understanding blockchain technology."
            },
            {
                "courseID": "C017",
                "title": "Cloud Computing Course",
                "start_date": new Date("2024-03-17T08:00:00Z"),
                "duration": 21,
                "description": "Introduction to cloud computing."
            },
            {
                "courseID": "C018",
                "title": "SEO Course",
                "start_date": new Date("2024-03-18T08:00:00Z"),
                "duration": 14,
                "description": "Master search engine optimization."
            },
            {
                "courseID": "C019",
                "title": "Data Science Course",
                "start_date": new Date("2024-03-19T08:00:00Z"),
                "duration": 21,
                "description": "Introduction to data science."
            },
            {
                "courseID": "C020",
                "title": "UX Research Course",
                "start_date": new Date("2024-03-20T08:00:00Z"),
                "duration": 14,
                "description": "Learn user experience research techniques."
            }
        ];

        
        const PositionsData = [
            {
                positionID: "P001",
                title: "CEO",
                vacant: false,
                required_skills: ["Leadership", "Strategic Planning", "Financial Management"],
                held_by: ["1001"],
                hierarchy_level: 1,
                courses: ["C004", "C008","C012","C011","C010","C006","C014"],
                workshops: ["W004", "W005", "W008","W009"]
            },
            {
                positionID: "P002",
                title: "CTO",
                vacant: false,
                required_skills: ["Technical Leadership", "Innovation", "Technology Strategy", "Product Development"],
                held_by: ["1002"],
                hierarchy_level: 1,
                courses: ["C001", "C002", "C003","C009", "C014"],
                workshops: ["W001", "W002", "W003","W009"]
            },
            {
                positionID: "P003",
                title: "CFO",
                vacant: false,
                required_skills: ["Financial Management", "Accounting", "Risk Management"],
                held_by: ["1003"],
                hierarchy_level: 1,
                courses: ["C006","C004","C014","C009"],
                workshops: ["W005"]
            },
            {
                positionID: "P004",
                title: "Software Development Manager",
                vacant: true,
                required_skills: ["Software Development", "Team Management", "Project Management"],
                held_by: [],
                hierarchy_level: 2,
                courses: ["C003", "C008","C012","C004","C010"],
                workshops: ["W006", "W008"]
            },
            {
                positionID: "P005",
                title: "Senior Software Engineer",
                vacant: false,
                required_skills: ["Software Development", "Problem Solving", "Communication", "Teamwork", "Leadership"],
                held_by: ["1004", "1005", "1013"],
                hierarchy_level: 3,
                courses: ["C001","C002", "C003", "C0018","C004"],
                workshops: ["W001", "W006"]
            },
            {
                positionID: "P006",
                title: "Senior Data Analyst",
                vacant: true,
                required_skills: ["Data Analysis", "Data Visualization", "SQL", "Python"],
                held_by: [],
                hierarchy_level: 3,
                courses: ["C002", "C007","C008","C004"],
                workshops: ["W002", "W006", "W007"]
            },
            {
                positionID: "P007",
                title: "Senior UI/UX Designer",
                vacant: false,
                required_skills: ["UI/UX Design", "Wireframing", "Prototyping", "User Research"],
                held_by: ["1008", "1014"],
                hierarchy_level: 3,
                courses: ["C005","C008","C004","C020"],
                workshops: ["W007"]
            },
            {
                positionID: "P008",
                title: "Junior Software Developer",
                vacant: false,
                required_skills: ["Software Development", "Problem Solving", "Communication", "Teamwork"],
                held_by: ["1015", "1016"],
                hierarchy_level: 4,
                courses: ["C001", "C003","C002","C017"],
                workshops: ["W001"]
            },
            {
                positionID: "P009",
                title: "Junior Data Analyst",
                vacant: false,
                required_skills: ["Data Analysis", "Data Visualization", "SQL", "Python"],
                held_by: ["1010", "1017","C015"],
                hierarchy_level: 4,
                courses: ["C002","C019"],
                workshops: ["W002", "W006"]
            },
            {
                positionID: "P010",
                title: "IT Support Specialist",
                vacant: false,
                required_skills: ["Technical Support", "Troubleshooting", "Customer Service"],
                held_by: ["1011", "1018"],
                hierarchy_level: 5,
                courses: [],
                workshops: ["W008"]
            },
            {
                positionID: "P011",
                title: "Intern",
                vacant: false,
                required_skills: [],
                held_by: ["1012", "1019", "1020", "1021"],
                hierarchy_level: 6,
                courses: [],
                workshops: []
            }
        ];


        // const PositionsData = [
        //     // {
        //     //     "positionID": "P001",
        //     //     "title": "Software Engineer",
        //     //     "vacant": false,
        //     //     "required_skills": ["JavaScript", "Node.js", "MongoDB"],
        //     //     "held_by": ["E1001"]
        //     // },
        //     // {
        //     //     "positionID": "P002",
        //     //     "title": "Data Analyst",
        //     //     "vacant": false,
        //     //     "required_skills": ["Python", "Django", "SQL"],
        //     //     "held_by": ["E1002"]
        //     // },
        //     // {
        //     //     "positionID": "P003",
        //     //     "title": "Frontend Developer",
        //     //     "vacant": true,
        //     //     "required_skills": ["HTML", "CSS", "JavaScript"],
        //     //     "held_by": []
        //     // },
        //     {
        //         positionID: "P001",
        //         title: "CEO",
        //         vacant: false,
        //         required_skills: ["Leadership", "Strategic Planning", "Financial Management"],
        //         held_by: ["1001"],
        //         hierarchy_level: 1
        //     },
        //     {
        //         positionID: "P002",
        //         title: "CTO",
        //         vacant: false,
        //         required_skills: ["Technical Leadership", "Innovation", "Technology Strategy", "Product Development"],
        //         held_by: ["1002"],
        //         hierarchy_level: 1
        //     },
        //     {
        //         positionID: "P003",
        //         title: "CFO",
        //         vacant: false,
        //         required_skills: ["Financial Management", "Accounting", "Risk Management"],
        //         held_by: ["1003"],
        //         hierarchy_level: 1
        //     },
        //     {
        //         positionID: "P004",
        //         title: "Software Development Manager",
        //         vacant: true,
        //         required_skills: ["Software Development", "Team Management", "Project Management"],
        //         held_by: [],
        //         hierarchy_level: 2
        //     },
        //     {
        //         positionID: "P005",
        //         title: "Senior Software Engineer",
        //         vacant: false,
        //         required_skills: ["Software Development", "Problem Solving", "Communication", "Teamwork", "Leadership"],
        //         held_by: ["1004", "1005", "1013"],
        //         hierarchy_level: 3
        //     },
        //     {
        //         positionID: "P006",
        //         title: "Senior Data Analyst",
        //         vacant: true,
        //         required_skills: ["Data Analysis", "Data Visualization", "SQL", "Python"],
        //         held_by: [],
        //         hierarchy_level: 3
        //     },
        //     {
        //         positionID: "P007",
        //         title: "Senior UI/UX Designer",
        //         vacant: false,
        //         required_skills: ["UI/UX Design", "Wireframing", "Prototyping", "User Research"],
        //         held_by: ["1008", "1014"],
        //         hierarchy_level: 3
        //     }, 
        //     {
        //         positionID: "P008",
        //         title: "Junior Software Developer",
        //         vacant: false,
        //         required_skills: ["Software Development", "Problem Solving", "Communication", "Teamwork"],
        //         held_by: ["1015", "1016"],
        //         hierarchy_level: 4
        //     },
        //     {
        //         positionID: "P009",
        //         title: "Junior Data Analyst",
        //         vacant: false,
        //         required_skills: ["Data Analysis", "Data Visualization", "SQL", "Python"],
        //         held_by: ["1010", "1017"],
        //         hierarchy_level: 4
        //     },
        //     {
        //         positionID: "P010",
        //         title: "IT Support Specialist",
        //         vacant: false,
        //         required_skills: ["Technical Support", "Troubleshooting", "Customer Service"],
        //         held_by: ["1011", "1018"],
        //         hierarchy_level: 5
        //     },
        //     {
        //         positionID: "P011",
        //         title: "Intern",
        //         vacant: false,
        //         required_skills: [],
        //         held_by: ["1012", "1019", "1020", "1021"],
        //         hierarchy_level: 6
        //     }
        // ];


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
