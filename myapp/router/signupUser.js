// express is node.js framework. It is used to create single page , multi page and hybrid page applications and APIs
const express = require("express")

//router function create a new router object in your application. Router is used to create a router object in program //to handle requests
var router = express.Router();

// bcrypt is a method to hashing the passwords before storing in database
const bcrypt = require("bcrypt")

// importing schema to create new user
const NewUser = require("../user/signup");

//endpoint to signup new user
router.post("/signup", async (req, res) => {
    const users = await NewUser.find();

    // checking user is existing or not
    const mail = users.filter(user => {
        return user.email == req.body.email
    })

    // if user is existing it will not save it and send response
    if (mail.length > 0) {
        res.send("this email is already registered")
    }
    // if user not existed
    else {

        // hashing the password using bcrypt
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.status(500)
            }
            else {
                const user = new NewUser({
                    email: req.body.email,
                    password: hash
                })
                //user.save method for storing the data in mongodb
                //.then method used to send response if resolved
                user.save().then(result => {
                    // res.send used to send a response to client
                    res.send("user created")
                    // .catch method used to catch the error 
                }).catch(err => {
                    res.send("error")
                })
            }
        })
    }
})

// endpoint for user login
router.post("/login", async (req, res) => {
    //.find query to find all user have same email
    await NewUser.find({ email: req.body.email }).then(user => {
        // if given email not matched
        if (user.length < 1) {
            res.send("Authentication Failed")
        }
        //if given email is matched
        else {
            //comparing the given password with hashed password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    res.status(200).json({
                        message: "Authentication Passed, you are logged in"
                    })
                }
                else if (err) {
                    res.send("Authentication Failed")
                } else {
                    res.send("Authentication Failed")
                }
            })
        }
    })

})


router.delete("/:id", async (req, res) => {
    let users = await NewUser.find();
    // checking if any id matched
    let id = users.filter(elem => {
        return elem._id == req.params.id
    })
    res.send(id)
    //if id matched
    if (id.length > 0) {
        //.deleteOne query used to delete the first document matched with given id
        await NewUser.deleteOne({ _id: req.params.id })
    } else {
        res.send("Please enter a valid Id. This id is not available in database")
    }
})
// module.exports is used to export a function, object
module.exports = router;