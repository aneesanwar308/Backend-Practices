const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
    username: {
        type: String
    },
    role: {
        type: String
    },
    date: {
        type: String
    }
})
module.exports = mongoose.model("Date", dateSchema)