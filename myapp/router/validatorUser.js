const express = require("express")
const router = express()
const schema = require("../user/validator")
const joi = require("joi")

const validation = (user) => {
    const validscema = joi.object({
        userName: joi.string().min(3).max(30).required(),
        password: joi.string(),
        repeatPassword: joi.ref("password"),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } }),
        birthYear: joi.number().integer().min(1940).max(2021)
    })
    return validscema.validate(user)
}
function userValidation(validator) {
    return (req, res, next) => {
        const { error } = validator(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        next()
    }
}

router.post("/validatedUser", userValidation(validation), async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const uniqueMail = await schema.findOne({ email: email })
    const uniqueName = await schema.findOne({ userName: userName })
    if (uniqueMail != null) {
        res.json({ message: "User is already registered. Enter another email" })
    } else if (uniqueName != null) {
        res.json({ message: "Username is already taken. Try another userName" })
    }
    else {
        const ValidUser = await new schema({
            userName: req.body.userName,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword,
            email: req.body.email,
            birthYear: req.body.birthYear
        })
        let savedValidUser = await ValidUser.save();
        res.status(200).json({ savedValidUser })
    }
})

module.exports = router