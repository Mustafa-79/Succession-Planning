const mongoose = require('mongoose')

const HR_AdminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    password: String,
});

const HR_AdminModel = mongoose.model('HR_Admin', HR_AdminSchema)

module.exports = HR_AdminModel;