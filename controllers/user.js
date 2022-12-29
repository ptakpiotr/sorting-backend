const userSchemaValid = require("../validation/userSchemaValid");
const userLoginSchemaValid = require("../validation/userLoginSchemaValid");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

async function registerUser(req, res) {
    const { email, password } = req.body;

    const validationRes = await userSchemaValid.isValid(req.body);
    if (validationRes) {
        try {
            const user = await User.create({ email, password });
            const token = await user.generateJWT();
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
            }
            else if (user.invalidLogins >= 5) {
                res.status(StatusCodes.TOO_MANY_REQUESTS).send();
            }

            const passwordMatches = await user.passwordMatches(password);

            if (passwordMatches) {
                const token = await user.generateJWT();

                res.status(StatusCodes.OK).send({
                    token
                });
            } else {
                await User.updateOne({ _id: user._id }, { invalidLogins: user.invalidLogins + 1 })
                res.status(StatusCodes.BAD_REQUEST).send();
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

module.exports = {
    loginUser,
    registerUser,
    deleteUser
}