const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const Event = require("../models/Event");

const express = require("express");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try{
        const event = await Event.find();

        res.status(200).json(event);
    }
    catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.post("/", auth, admin, async (req, res) => {
    try{
        const newEvent = await Event.create(req.body);

        res.status(201).json(newEvent);
    }
    catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.put("/:id", auth, admin, async (req, res) => {
    try{
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        if(!updatedEvent){
            return res.status(404).json({
                message: "Event not found!"
            });
        }

        res.json(updatedEvent);
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;