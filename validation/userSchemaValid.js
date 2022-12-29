const yup = require("yup");

module.exports = yup.object().shape({
    email: yup.string().required().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().test("passwordTest", "Both password must match", function (value) {
        return this.parent.password === value;
    })
});