const mongoose = require("mongoose");

const AlgorithmSchema = new mongoose.Schema({
    name: String,
    photo: String,
    complexity: String
});

module.exports = mongoose.model("Algorithm", AlgorithmSchema);