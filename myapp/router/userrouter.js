// express is node.js framework. It is used to create single page , multi page and hybrid page applications and APIs
const express = require("express")
//router function create a new router object in your application. Router is used to create a router object in program //to handle requests
var router = express.Router();

//multer library used to upload form-data like files in application
const multer = require("multer")
// dest property has a value with folder name and tells multer where("uploads/" folder) to upload the files
const upload = multer({ dest: "uploads/" })
//importing schema for creating new user
const user = require("../user/user")

// creating middleware to check whether email existed or not
const middleware = async (req, res, next) => {
    // find() return all matched documents with given value
    const users = await user.find()
    const email = req.params.email;
    // checking matched email existed or not
    const existedMail = users.filter(elem => {
        return elem.email == email
    })
    // if mail not existed
    if (existedMail.length > 0) {
        res.send("This email is already registered");
    }
    else {
        //next() used to execute that endpoint where middleware is using
        next()
    }
}

// endpoint to create user
router.post("/user/:email", middleware, upload.single("image"), async (req, res) => {

    // creating new user and saving to db
    const newUser = await new user({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        image: req.file.originalname
    })
    // saving to database(mongodb)
    let saveData = await newUser.save()
    //.status() is used to set a status code to server and .json used to send data in the form of json
    res.status(200).json({ saveData })
})

// endpoint to update 
// giving email in route parameters
router.put("/findAndUpdate/:email", async (req, res) => {
    let userEmail = req.body.email;
    let userName = req.body.name;
    let userAddress = req.body.address;

    // getting email from route parameters
    let email = req.params.email;
    //.findOne() is used to find first document matched given email and document's email
    const newuser = await user.findOne({ email: email })

    if (newuser !== null) {
        //.updateOne() is used to update first document matched given email and document's email. updateOne() takes to objects first to find and second what to update
        const updatedEmail = await user.updateOne({ email: email }, { $set: { name: userName, email: userEmail, address: userAddress } })
        console.log(updatedEmail)
    }
})

// endpoint to get all users with unique id
router.get("/allusers/:id", async (req, res) => {
    // find() returns all documents. If there is any value it will return all matched documents.
    const allusers = await user.find()
    const id = req.params.id;
    //filter method returns data that will passed the given condition
    const uniqueUsers = allusers.filter(elem => {
        return id == elem._id
    })
    //.send used to send response
    res.send(uniqueUsers)
})

// endpoint to get single user with unique id
router.get("/getUserById/:id", async (req, res) => {
    const id = req.params.id
    //.findOne() is used to find first document matched given email and document's email
    const userById = await user.findOne({ _id: id })
    //.send used to send response
    res.send(userById)
    console.log(userById)
})



//exporting router
module.exports = router;