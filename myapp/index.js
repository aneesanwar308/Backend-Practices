// express is node.js framework. It is used to create single page , multi page and hybrid page applications and APIs
const express = require("express");
//Mongoose provides a straight-forward, schema-based solution to model your application data.
const mongoose = require("mongoose")

// importing routers 
const checkRout = require("./middleware/jwt")
const userRouter = require("../myapp/router/userrouter")
const videoRouter = require("./router/videotutRouter")
const signupRouter = require("./router/signupUser")
const validation = require("./router/validatorUser")
const dateRouter = require("./router/dateRouter")

const app = express();

app.use(express.json());

//use() is a method to configure the middleware used by the routes of the Express HTTP server object
app.use("/check", checkRout)
app.use("/video", videoRouter)
app.use("/user", userRouter)
app.use('/api', signupRouter)
app.use("/valid", validation)
app.use("/date", dateRouter)

// connect() used to connect with mongodb
mongoose.connect("mongodb://localhost:27017/load", () => {
    // if connected will console message "connected"
    console.log("connected")
})

// listen() method tells the server where to run or on which port no# run
app.listen(8000, () => {
    console.log("this app is running on port 8000")
})


// const newDate = new Date("2021-11-19T18:52:24.134Z");
// newDate.setHours(newDate.getHours() - 12)
// console.log(newDate.toISOString())