const { StatusCodes } = require("http-status-codes");

const Numbers = require("../models/Number");
const User = require("../models/User");

async function getNumbers(req, res) {
    const { email } = req.userAuthInfo;

    if (!email) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }

    try {
        const user = await User.findOne({ email });
        const nums = await Numbers.find({ createdBy: user._id }, { _id: 0, createdBy: 0 });

        res.status(StatusCodes.OK).send({
            nums
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }
};

async function addNumbers(req, res) {
    const { numbers, algorithm } = req.body;
    const { email } = req.userAuthInfo;

    if (!email || !numbers) {
        res.status(StatusCodes.BAD_REQUEST).send();
    }

    try {
        const user = await User.findOne({ email });
        await Numbers.create({
            numbers,
            algorithm,
            createdBy: user._id,
            date: new Date()
        });

        res.status(StatusCodes.CREATED).send();
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).send();
    }
};

module.exports = {
    getNumbers,
    addNumbers
}