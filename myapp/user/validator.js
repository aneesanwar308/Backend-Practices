const mongoose = require("mongoose");
const joi = require("joi")

const schema = new mongoose.Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    repeatPassword: {
        type: String
    },
    email: {
        type: String
    },
    birthYear: {
        type: Number
    }
})

module.exports = mongoose.model("ValidatedUser", schema)