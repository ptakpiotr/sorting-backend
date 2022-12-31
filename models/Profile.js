const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    allowAddingItems: {
        type: Boolean,
        required: [true, 'Adding items setting required'],
        default: true
    },
    displayAlgorithmsDescription: {
        type: Boolean,
        required: [true, 'Display algorithms description required'],
        default: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Profile', ProfileSchema);