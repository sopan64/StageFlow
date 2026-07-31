const Announcement = require("../models/Announcement");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const announcements = await Announcement.find().sort({ createdAt: -1 });

        res.status(200).json(announcements);
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/", async (req, res) => {
    try{
        const newAnnouncement = await Announcement.create(req.body);

        res.status(201).json(newAnnouncement);
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

        if(!deletedAnnouncement){
            return res.status(404).json({
                message: "Announcement not found!"
            });
        }

        res.status(204).send();
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
})

module.exports = router;