require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide the email for the user'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required for the user'],
        minlength: 8
    },
    invalidLogins: {
        type: Number,
        default: 0
    }
})

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "30m",
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    });

    return token;
};

UserSchema.methods.passwordMatches = async function (passwordToCheck) {
    const matches = await bcrypt.compare(passwordToCheck, this.password);
    return matches;
};

module.exports = mongoose.model("User", UserSchema);