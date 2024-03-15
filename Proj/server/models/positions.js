const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    positionID: {
        type: String,
        unique: true
    },
    title: String,
    vacant: Boolean,
    required_skills: [String],
    held_by: [String]
});

const PositionModel = mongoose.model('Position', positionSchema)

module.exports = PositionModel;