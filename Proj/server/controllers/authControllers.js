
const test = (reqs, resp) => {
    resp.json('test is working')
}

const mongoose = require('mongoose')

const User = require('../models/users')
const HR_AdminModel = require('../models/hr_admin')
const Employee = require('../models/employee')
const Feedback = require('../models/feedback')
const Course = require('../models/course')
const PositionModel = require('../models/positions')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// Register Endpoint
const registerUser = async (reqs, resp) => {
    try {
        // console.log(reqs.body)
        const { name, email, password, empID, s_img, phone, dob, gender, education, certifications, awards, profilePicture, question, answer } = reqs.body;

        // Check if name was entered
        if (!name) {
            return resp.json({
                error: 'name is required'
            })
        }

        // Check if passowrd is good
        if (!password || password.length < 6) {
            return resp.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        }

        if (!s_img) {
            return resp.json({
                error: 'Security image is required'
            })
        }

        // Check email
        const exists = await Employee.findOne({ email })
        if (exists) {
            return resp.json({
                error: "Email is already used"
            })
        }

        // Create hash for password
        const hashedPassword = await hashPassword(password)

        // Update user
        const updatedUser = await Employee.findOneAndUpdate({ employeeID: empID }, { email:email , password: hashedPassword, two_factor_answer: s_img, contactNumber: phone, date_of_birth: dob, gender: gender, education: education, certifications: certifications, awards: awards, profile_picture: profilePicture, security_question: question, security_answer: answer, registered_status: true }, { new: true, runValidators: true })

        // Send response to the client
        return resp.json(updatedUser)

    } catch (error) {
        console.log(error)
    }
}

// Endpoint to login
const loginUser = async (reqs, resp) => {
    try {
        const { email, password, s_img } = reqs.body

        // Check if user exists
        const user = await Employee.findOne({ email })
        const user1 = await HR_AdminModel.findOne({ email })

        // If no user then send error
        if (!user && !user1) {
            return resp.json({
                error: 'No such user exists'
            })
        }

        // If the user is an employee
        if (user) {
            // Check if password match
            const match = await comparePassword(password, user.password)
            if (match) {
                jwt.sign({ email: user.email, id: user._id, name: user.name }, 'jhgjyhfhmgfy', {}, (err, token) => {
                    if (err) {
                        throw err
                    }
                    // Send token and user details
                    resp.cookie('token', token).json(user)
                })
            } else {
                return resp.json({
                    error: 'Incorrect password'
                })
            }

            // Check if security image is selected and  matches
            if (s_img.toString() != user.two_factor_answer) {
                console.log(s_img, user.two_factor_answer)
                return resp.json({
                    error: 'Incorrect two factor image selected'
                })
            }

            // Send user response
            return resp.json({
                user: user,
                no: 1
            })

        // If the user is an HR Admin
        } else if (user1) {
            const match = await comparePassword(password, user1.password)
            if (!match) {
                return resp.json({
                    error: 'Incorrect password'
                })
            }

            return resp.json({
                user: user1,
                no: 2
            })
        }

    } catch (error) {
        console.log(error)
    }
}

// Endpoint to get profile
const getProfile = (reqs, resp) => {
    const { token } = reqs.cookies
    if (token) {
        jwt.verify(token, 'jhgjyhfhmgfy', {}, (err, user) => {
            if (err) {
                throw err
            }
            resp.json(user)
        })
    } else {
        resp.json(null)
    }

}

// Endpoint to retrieve name of user
const retrieveName = async (reqs, resp) => {
    try {
        const { name, email, password, empID } = reqs.body;

        const exists = await Employee.findOne({ employeeID: empID })
        console.log(exists)
        if (!exists) {
            return resp.json({
                error: 'No such employee record exists'
            })
        } else if (exists.password) {
            return resp.json({
                error: 'Employee already registered'
            })
        } else {
            resp.json(exists)
        }
    } catch (error) {
        console.log(error)
    }
}

// Endpoint to retrieve security question
const retrieveSecurityQuestion = async (reqs, resp) => {
    try {
        const { empID } = reqs.body

        console.log('key', empID)

        const user = await Employee.findOne({ employeeID: empID })

        console.log(user)

        if (!user) {
            return resp.json({
                error: 'No such employee exists'
            })
        } else if (!user.password) {
            // Only send security question if user is not registered
            return resp.json({
                error: 'You are not registerd yet'
            })
        } else {
            resp.json(user.security_question)
        }

    } catch (error) {
        console.log(error)
    }
}

// Endpoint to reset password
const resetPassword = async (reqs, resp) => {
    try {
        const { empID, secQ, secA, s_img } = reqs.body
        console.log('hello', s_img)

        // Check if security image is selected
        if (!s_img) {
            return resp.json({
                error: 'You are required to select the security image'
            })
        }

        const user = await Employee.findOne({ employeeID: empID })

        console.log(secA, user.security_answer)

        if (!user) {
            // No user with that employee ID
            return resp.json({
                error: 'No such employee exists'
            })
        } else if (!user.password) {
            return resp.json({
                error: 'You are not registerd yet'
            })
        } else if (s_img.toString() != user.two_factor_answer) {
            return resp.json({
                error: 'Incorrect security image selected'
            })
        } else if (secA == user.security_answer) {
            resp.json('next')
        } else {
            return resp.json({
                error: 'Incorrect answer'
            })
        }

    } catch (error) {
        console.log(error)
    }
}

// Find and update password. New password cannot be the same as previous
const setPassword = async (reqs, resp) => {
    try {
        console.log('Bye')
        const { empID, password, samePassword } = reqs.body


        const user = await Employee.findOne({ employeeID: empID })
        console.log(empID, password, samePassword, user.password)

        const result = await comparePassword(password, user.password)

        console.log(result)

        if (result) {
            return resp.json({
                error: 'you can not enter same password as original'
            })
        }

        const hashedPassword = await hashPassword(password)

        // Update user
        const updatedUser = await Employee.findOneAndUpdate({ employeeID: empID }, { password: hashedPassword }, { new: true, runValidators: true })

        return resp.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
}

// Endpoint for if the user forgets their security image
const resetSecurityImage = async (reqs, resp) => {
    try {
        const { empID, newImage } = reqs.body;
        console.log(`Updating security image for employee ${empID} to ${newImage}`);

        // Find the user by employee ID
        const user = await Employee.findOne({ employeeID: empID });

        // Check if user exists
        if (!user) {
            console.log('Employee not found');
            return resp.json({
                error: 'No such employee exists'
            });
        }

        // Update the security image
        const updatedUser = await Employee.findOneAndUpdate(
            { employeeID: empID },
            { two_factor_answer: newImage },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.log('Failed to update the security image');
            return resp.json({
                error: 'Could not update the security image'
            });
        }

        console.log('Security image updated successfully');
        resp.json({
            message: 'Security image updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log('Error during the security image reset:', error);
        resp.status(500).json({
            error: 'Server error during the security image reset'
        });
    }
}

// Endpoint for verifying security answer
const verifySecurityAnswer = async (reqs, resp) => {
    try {
        const { empID, secA } = reqs.body
        // console.log('hello', s_img)

        const user = await Employee.findOne({ employeeID: empID })

        console.log(secA, user.security_answer)

        if (!user) {
            return resp.json({
                error: 'No such employee exists'
            })
        } else if (!user.password) {
            return resp.json({
                error: 'You are not registerd yet'
            })
        } else if (secA == user.security_answer) {
            resp.json('next')
        } else {
            return resp.json({
                error: 'Incorrect answer'
            })
        }

    } catch (error) {
        console.log(error)
    }
}

// Endpoint to submit feedback
const submitFeedback = async (reqs, resp) => {
    try {
        console.log(reqs.body)
        const { courseID, feedback, empID, rating } = reqs.body

        if (!courseID) {
            // Send error response to the client with code 400
            return resp.status(400).json({
                error: 'Course ID is required'
            });
        }

        // Fetch all courseIDs 
        const courses = await Course.find({})
        const courseIDs = courses.map(course => course.courseID)

        // Check if courseID is valid
        if (!courseIDs.includes(courseID)) {
            // Send error response to the client with code 400
            return resp.status(400).json({
                error: 'Course does not exist with the given ID'
            });
        }

        if (!feedback) {
            return resp.status(400).json({
                error: 'Feedback is required'
            });
        }

        // Assign unique ID to feedback
        const feedbackID = new mongoose.Types.ObjectId(); // Or use ObjectId for simplicity

        // Create a new feedback record
        const newFeedback = new Feedback({
            feedbackID: feedbackID.toString(),
            courseID,
            rating,
            employeeID: empID,
            feedback,
            date: new Date() // Use the current date
        });

        await newFeedback.save();

        // send response to the client
        resp.json({
            message: 'Feedback submitted successfully',
            feedback: newFeedback
        });

    } catch (error) {
        console.log(error)
    }
}

const returnProfile = async (reqs, resp) => {
    try {
        const {name} = reqs.body;

        console.log('Name', name)

        const exists = await Employee.findOne({name: name})

        console.log(exists)
        if (!exists) {
            return resp.json({
                error: 'No such employee record exists'
            }) 
        } else {
            const position = await PositionModel.findOne({positionID: exists.positionID})
            resp.json({record1: exists, record2: position})
        }
    } catch (error) {
        console.log(error)
    }

}

const uploadImage = async (reqs, resp) => {
    const {empID, profileImg} = reqs.body
    console.log(profileImg)
    const updatedUser = await Employee.findOneAndUpdate(
        { employeeID: empID },
        { profile_picture: profileImg },
        { new: true}
    );

    if (!updatedUser) {
        console.log('Failed to update the profile picture');
        return resp.json({
            error: 'Could not update the profile picture'
        });
    } else {
        console.log('Profile picture updated successfully');
        console.log(updatedUser)
        resp.json(updatedUser)
    }
}

const changePassword = async (reqs, resp) => {
    try {
        const { empID, password, samePassword } = reqs.body


        const user = await Employee.findOne({ employeeID: empID })
        console.log(empID, password, samePassword, user.password)

        const result = await comparePassword(password, user.password)

        if (!result) {
            return resp.json({
                error: 'you have entered invalid current password'
            })
        }

        const compare = await comparePassword(samePassword, user.password)

        if (compare) {
            return resp.json({
                error: 'New password must be different from current'
            })
        }

        const hashedPassword = await hashPassword(samePassword)

        // Update user
        const updatedUser = await Employee.findOneAndUpdate({ employeeID: empID }, { password: hashedPassword }, { new: true, runValidators: true })

        return resp.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
}

const changeSecurityImg = async (reqs, resp) => {
    try {
        const { empID, currentImg, newImg } = reqs.body


        const user = await Employee.findOne({ employeeID: empID })

        if (user.two_factor_answer != currentImg) {
            return resp.json({
                error: 'you have selected invalid security image'
            })
        }

        // Update user
        const updatedUser = await Employee.findOneAndUpdate({ employeeID: empID }, { two_factor_answer: newImg }, { new: true, runValidators: true })

        return resp.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async (reqs, resp) => {
    try {
        const user = reqs.body
        const updatedUser = await Employee.findOneAndUpdate({ employeeID: user.employeeID }, user, { new: true, runValidators: true })

        if (!updatedUser) {
            return resp.json ({
                error: 'Unable to update User Profile'
            })
        }

        return resp.json(updatedUser)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    retrieveName,
    retrieveSecurityQuestion,
    resetPassword,
    setPassword,
    resetSecurityImage,
    verifySecurityAnswer,
    submitFeedback,
    returnProfile,
    uploadImage,
    changePassword,
    changeSecurityImg,
    updateProfile
}

// {"_id":{"$oid":"65dfc56ee547a1714be98275"},"employeeID":"1007","name":"Rooshan","email":"","password":"","contactNumber":"987-654-3210","age":{"$numberInt":"28"},"positionID":"P002","skills":["Python","Django","SQL"],"two_factor_question":"What is your mother's maiden name?","two_factor_answer":"Johnson","mentor_ID":"2002","task_completion_rate":{"$numberDouble":"0.85"},"attendance_rate":{"$numberDouble":"0.98"},"job_history":["Data Analyst at XYZ Corp.","Intern at PQR Ltd."],"education":["Master's in Data Science"],"security_img":0,"certifications":["Google Analytics Certified"],"awards":["Best Newcomer Award"],"profile_picture":"https://example.com/profile2.jpg","__v":{"$numberInt":"0"}}