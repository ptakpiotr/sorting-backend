const wiki = require("wikipedia");
const { StatusCodes } = require("http-status-codes");
const algorithmValidation = require("../validation/algorithmsSchemaValid");
const Algorithm = require("../models/Algorithm");

async function getSingleAlgorithm(req, res) {
    const validationRes = await algorithmValidation.isValid(req.query);

    if (validationRes) {
        const { lang, algorithm } = req.query;
        let desc;

        await wiki.setLang(lang);

        try {
            const page = await wiki.page(algorithm);
            const summary = await page.summary();
            desc = summary.extract;
        } catch (err) {
            console.error(err);
        }

        res.status(StatusCodes.OK).json({
            description: desc
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).send();
    }
};

async function getAllAlgorithms(req, res) {
    try {
        const data = await Algorithm.find({});
        res.status(StatusCodes.OK).send({ data });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}

module.exports = {
    getSingleAlgorithm,
    getAllAlgorithms
}