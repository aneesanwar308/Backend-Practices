// Mongoose provides a straight-forward, schema-based solution to model your application data.
const mongoose = require("mongoose");
//Schema defines the structure of document
const videoTut = new mongoose.Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    instructions: {
        type: Array
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    }
})
// model provides an interface to mongodb for creating, updating , deleting records
module.exports = mongoose.model("videoTutorials", videoTut)