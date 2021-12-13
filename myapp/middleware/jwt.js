// express is node.js framework. It is used to create single page , multi page and hybrid page applications and APIs
const express = require("express")
//router function create a new router object in your application. Router is used to create a router object in program //to handle requests
var router = express.Router();
// importing schema to create new document
const NewVideo = require("../user/videotutorial")

router.post("/check/:role", async (req, res) => {
    // checking if role is user then he can only see the data
    if (req.params.role == "user") {
        // find() return all matched documents with given value
        const showVideos = await NewVideo.find()
        //.send used to send response
        res.send(showVideos)
    }
    // if role is admin then can create new video
    else if (req.params.role = "admin") {
        // find() return all matched documents with given value
        const allVideos = await NewVideo.find()
        // creating new document and saving in db
        const newvideos = new NewVideo({
            title: req.body.title,
            link: req.body.link,
            description: req.body.description,
            instructions: req.body.instructions,
            user_id: req.body.user_id
        })
        //.save used to save document in db
        let saveData = await newvideos.save()
        //.status used to set status code of server and json returns data in json format
        res.status(200).json({ newvideo: saveData, allvideos: allVideos })
    }
    // if given role is not matcing with role this message will show
    else {
        //.send used to send response
        res.send("given role is not valid. Only admin and user is valid role")
    }
})
// exporting router
module.exports = router