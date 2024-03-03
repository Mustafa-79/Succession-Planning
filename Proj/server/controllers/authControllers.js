
const test = (reqs, resp) => {
    resp.json('test is working')
}

const User = require('../models/users')
const Employee = require('../models/employee')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// Register Endpoint
const registerUser = async (reqs, resp) => {
    try {
        const {name, email, password, empID, s_img, phone, dob, gender, education, certifications, awards, question, answer } = reqs.body;

        console.log(reqs.body)

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

        if(!s_img) {
            return resp.json({
                error: 'Security image is required'
            })
        }

        // Check email
        const exists = await Employee.findOne({email})
        if (exists) {
            return resp.json({
                error: "Email is already used"
            })
        }

        // Create hash for password
        const hashedPassword = await hashPassword(password)

        // Update user
        const updatedUser = await Employee.findOneAndUpdate({employeeID: empID}, {email, password: hashedPassword, two_factor_answer: s_img, contactNumber: phone, date_of_birth: dob, gender: gender, education: education, certifications: certifications, awards: awards, security_question: question, security_answer: answer, registered_status: true}, { new: true, runValidators: true })

        return resp.json(updatedUser)

    } catch (error) {
        console.log(error)
    }
}

// Login Endpoint
const loginUser = async (reqs, resp) => {
    try {
        const {email, password, s_img} = reqs.body 

        // Check if user exists
        const user = await Employee.findOne({email})
        if (!user) {
            return resp.json({
                error: 'No such user exists'
            })
        }

        // Check if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, 'jhgjyhfhmgfy', {}, (err, token) => {
                if (err) {
                    throw err
                }
                resp.cookie('token', token).json(user)
            })
        } else {
            return resp.json({
                error: 'Incorrect password'
            }) 
        }

        if (s_img.toString() != user.two_factor_answer) {
            console.log(s_img, user.two_factor_answer)
            return resp.json({
                error: 'Incorrect two factor image selected'
            })
        }

        return resp.json(user)

    } catch (error) {
        console.log(error)
    }
}

const getProfile = (reqs, resp) => {
    const {token} = reqs.cookies
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

const retrieveName = async (reqs, resp) => {
    try {
        const {name, email, password, empID} = reqs.body;

        const exists = await Employee.findOne({employeeID: empID})
        console.log(exists)
        if (!exists) {
            return resp.json({
                error: 'No such employee record exists'
            }) 
        } else if (exists.password){
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

const retrieveSecurityQuestion = async (reqs, resp) => {
    try {
        const {empID} = reqs.body

        console.log('key', empID)

        const user = await Employee.findOne({employeeID: empID})

        console.log(user)

        if (!user) {
            return resp.json({
                error: 'No such employee exists'
            })
        } else if (!user.password) {
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

const resetPassword = async (reqs, resp) => {
    try {
        const {empID, secQ, secA, s_img} = reqs.body
        console.log('hello', s_img)

        if (!s_img) {
            return resp.json({
                error: 'You are required to select the security image'
            }) 
        }

        const user = await Employee.findOne({employeeID: empID})

        console.log(secA, user.security_answer)

        if (!user) {
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

const setPassword = async (reqs, resp) => {
    try {
        console.log('Bye')
        const {empID, password, samePassword} = reqs.body

        
        const user = await Employee.findOne({employeeID: empID})
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
        const updatedUser = await Employee.findOneAndUpdate({employeeID: empID}, {password: hashedPassword}, { new: true, runValidators: true })

        return resp.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
}

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

const verifySecurityAnswer = async (reqs, resp) => {
    try {
        const {empID, secA} = reqs.body
        // console.log('hello', s_img)

        const user = await Employee.findOne({employeeID: empID})

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
    verifySecurityAnswer
}

// {"_id":{"$oid":"65dfc56ee547a1714be98275"},"employeeID":"1007","name":"Rooshan","email":"","password":"","contactNumber":"987-654-3210","age":{"$numberInt":"28"},"positionID":"P002","skills":["Python","Django","SQL"],"two_factor_question":"What is your mother's maiden name?","two_factor_answer":"Johnson","mentor_ID":"2002","task_completion_rate":{"$numberDouble":"0.85"},"attendance_rate":{"$numberDouble":"0.98"},"job_history":["Data Analyst at XYZ Corp.","Intern at PQR Ltd."],"education":["Master's in Data Science"],"security_img":0,"certifications":["Google Analytics Certified"],"awards":["Best Newcomer Award"],"profile_picture":"https://example.com/profile2.jpg","__v":{"$numberInt":"0"}}