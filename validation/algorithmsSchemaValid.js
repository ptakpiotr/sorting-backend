const yup = require("yup");

module.exports = yup.object().shape({
    lang: yup.string().required(),
    algorithm: yup.string().matches(/.+/,).required()
})