const mongoose = require("mongoose");

const NumberSchema = mongoose.Schema({
    numbers: {
        type: [Number],
        required: [true, 'Numbers are required']
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    algorithm: {
        type: String,
        require: [true, 'Algorithm is required']
    },
    date: Date
});

module.exports = mongoose.model("Number", NumberSchema);