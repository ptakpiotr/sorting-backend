const { StatusCodes } = require("http-status-codes");

const Numbers = require("../models/Number");
const User = require("../models/User");

async function getNumbers(req, res) {
    const { email } = req.params;

    if (!email) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }

    try {
        const user = await User.findOne({ email });
        const nums = await Numbers.findById(user._id);

        res.status(StatusCodes.OK).send({
            nums
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }
};

async function addNumbers(req, res) {
    const { email, numbers } = req.body;

    if (!email || !numbers) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }

    try {
        const user = await User.findOne({ email });
        await Numbers.create({
            numbers,
            createdBy: user._id
        });

        res.status(StatusCodes.CREATED).send();
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }
};

module.exports = {
    getNumbers,
    addNumbers
}