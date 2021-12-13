//Mongoose provides a straight-forward, schema-based solution to model your application data.
const mongoose = require("mongoose");
//Schema defines the structure of document
const user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
})
// model provides an interface to mongodb for creating, updating , deleting records
module.exports = mongoose.model("user", user)