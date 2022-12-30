const mongoose = require("mongoose");

const NumberSchema = mongoose.Schema({
    numbers: {
        type: [Number],
        required: [true, 'Numbers are required']
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Number", NumberSchema);