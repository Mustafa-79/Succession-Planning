
const test = (reqs, resp) => {
    resp.json('test is working')
}

const User = require('../models/users')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// Register Endpoint
const registerUser = async (reqs, resp) => {
    try {
        const {name, email, password} = reqs.body;

        console.log(name, email, password)

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

        // Check email
        const exists = await User.findOne({email})
        if (exists) {
            return resp.json({
                error: "Email is already used"
            })
        }

        const hashedPassword = await hashPassword(password)

        // Create user
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })

        return resp.json(user)

    } catch (error) {
        console.log(error)
    }
}

// Login Endpoint
const loginUser = async (reqs, resp) => {
    try {
        const {email, password} = reqs.body 

        // Check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return resp.json({
                error: 'No user found'
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

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}