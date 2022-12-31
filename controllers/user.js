const { StatusCodes } = require("http-status-codes");

const userSchemaValid = require("../validation/userSchemaValid");
const userLoginSchemaValid = require("../validation/userLoginSchemaValid");

const User = require("../models/User");
const Profile = require("../models/Profile");

const verifyJWT = require("../utils/verifyJWT");

async function registerUser(req, res) {
    const { email, password } = req.body;

    const validationRes = await userSchemaValid.isValid(req.body);
    if (validationRes) {
        try {
            const user = await User.create({ email, password });
            const token = await user.generateJWT();

            const profile = await Profile.create({
                createdBy: user._id
            });

            res.status(StatusCodes.CREATED).send({
                token
            });
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                msg: "Unexpected error happened, please retry"
            });
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send({
            validationRes
        });
    }
};

async function loginUser(req, res) {
    const { email, password } = req.body;

    const validationRes = await userLoginSchemaValid.isValid(req.body);
    if (validationRes) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).send();
                return;
            }
            else if (user.invalidLogins >= 5) {
                res.status(StatusCodes.TOO_MANY_REQUESTS).send();
            }

            const passwordMatches = await user.passwordMatches(password);

            if (passwordMatches) {
                const token = await user.generateJWT();
                const profile = await Profile.findOne({ createdBy: user._id }, { _id: 0, createdBy: 0 });
                res.status(StatusCodes.OK).send({
                    token,
                    profile
                });
            } else {
                await User.updateOne({ _id: user._id }, { invalidLogins: user.invalidLogins + 1 })
                throw new Error();
            }
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                msg: "Unexpected error happened, please retry"
            });
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).send({
            validationRes
        });
    }
};

async function deleteUser(req, res) {
    const { email } = req.params;

    if (!email) {
        res.status(StatusCodes.BAD_REQUEST).send();
        return;
    }

    try {
        await User.deleteOne({ email });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
};

async function verifyJWTToken(req, res) {
    const { token, verifyAdmin } = req.body;
    try {
        verifyJWT(`Bearer ${token}`, verifyAdmin);
        res.status(StatusCodes.OK).send();

    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).send();
    }
}

async function updateProfile(req, res) {
    try {
        const { allowAddingItems, displayAlgorithmsDescription } = req.body;
        const user = await User.findOne({ email: req.userAuthInfo.email });
        await Profile.updateOne({ createdBy: user._id }, {
            allowAddingItems,
            displayAlgorithmsDescription
        });
        res.status(StatusCodes.OK).send();
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).send();
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find({ group: "user" }, { _id: 0, __v: 0, password: 0 });
        res.status(StatusCodes.OK).send({
            users
        });

    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}

async function resetLogins(req, res) {
    const { email } = req.body;
    try {
        await User.updateOne({ email }, { invalidLogins: 0 });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).send();
    }
}

module.exports = {
    loginUser,
    registerUser,
    deleteUser,
    verifyJWTToken,
    updateProfile,
    getUsers,
    resetLogins
}