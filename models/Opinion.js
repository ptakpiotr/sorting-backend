const mongoose = require("mongoose");

const OpinionSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Opinion text is required, please provide']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model("Opinion", OpinionSchema);