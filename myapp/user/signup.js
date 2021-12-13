//Mongoose provides a straight-forward, schema-based solution to model your application data.
const mongoose = require("mongoose");
//Schema defines the structure of document
const userSignup = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
// model provides an interface to mongodb for creating, updating , deleting records
module.exports = mongoose.model("userSignup", userSignup)