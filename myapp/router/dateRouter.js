const express = require("express")
var router = express.Router();
const dateModel = require("../user/date")

router.post("/date", async (req, res) => {
    const newData = new dateModel({
        username: req.body.username,
        role: req.body.role,
        date: new Date().toISOString()
    })
    const savedDate = await newData.save();
    res.status(200).json({ savedDate })
})

router.get("/readDate", async (req, res) => {
    const allDates = await dateModel.find()
    res.status(200).json({ allDates })
})

router.put("/updateDate", async (req, res) => {
    const dates = await dateModel.find()
    let updated;
    for (var i = 0; i < dates.length; i++) {
        const newDate = new Date(dates[i].date);
        newDate.setHours(newDate.getHours() - 12)
        const isoDate = newDate.toISOString();
        console.log(isoDate, dates[i].id)
        updated = await dateModel.update({ _id: dates[i].id }, { $set: { date: isoDate } })
    }
    res.status(200).json({ updated })
})

module.exports = router