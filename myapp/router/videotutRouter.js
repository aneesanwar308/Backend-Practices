// express is node.js framework. It is used to create single page , multi page and hybrid page applications and APIs
const express = require("express")
//router function create a new router object in your application. Router is used to create a router object in program //to handle requests
var router = express.Router();
//importing schemas to create new documents
const videoTut = require("../user/videotutorial")
const user = require("../user/user");

//endpoint to create new document
router.post("/videoTut", async (req, res) => {
    // creating new document
    const newvideoTut = new videoTut({
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        instructions: req.body.instructions
    })
    //.save used to save document in db
    let saveData = await newvideoTut.save()
    //.status used to set status code of server and json returns data in json format
    res.status(200).json({ saveData })
})

// endpoint to get user and videos with unique id
router.get("/getVideobyId/:id", async (req, res) => {
    // find() return all matched documents with given value
    const alltutorials = await videoTut.find();
    const allusers = await user.find();
    const id = req.params.id;
    let uniqueUser;
    let uniqueTut;
    // for loop used to execute the block of code until the condition true
    for (var i = 0; i < allusers.length; i++) {
        if (id == allusers[i]._id) {
            uniqueUser = allusers[i]._id;
            //filter method returns data that will passed the given condition
            uniqueTut = alltutorials.filter(elem => {
                return elem.user_id == id
            })
        }
    }
    const uniqueArray = {
        user_id: uniqueUser._id,
        tutorials: uniqueTut
    }
    //.send used to send response
    res.send(uniqueArray)
})

//enpoint to update
router.get("/user_id/:id", async (req, res) => {
    const userId = req.params.id
    //updateMany updates all the matched documents
    await videoTut.updateMany({ user_id: { "$exists": true } }, { $set: { user_id: userId } })
    await videoTut.updateMany({ user_id: { "$exists": false } }, { $set: { user_id: null } })
})

// endpoint to update
router.put("/addnewfield/:id", async (req, res) => {
    const id = req.params.id;
    // updateOne updates the first matched documents
    const findElem = await videoTut.updateOne({ user_id: "619258dce7c757b40cb75fb9" }, { $set: { user_id: id } })
    //.send used to send response
    res.send(findElem)
})


router.get("/userVideos", async (req, res) => {
    // const id = req.params.id;
    // const uniqueUser = await user.find({ _id: id })
    // const allVideos = await videoTut.find({ user_id: id })
    // let uniqueVideos;
    // if (allVideos.length < 1) {
    //     uniqueVideos = "This user has no video to show"
    // } else {
    //     uniqueVideos = allVideos
    // }
    // const allData = { uniqueUser, uniqueVideos }
    // res.send(allData)

    user.aggregate({
        $lookup: {
            from: "videoTut",
            localField: "_id",
            foreignField: "user_id",
            as: "combinedUserVideos"
        }
    }).then((result) => {
        res.send(result)
    }).catch(err => {
        res.json({ message: "er" })
    })

})



//exporting router
module.exports = router