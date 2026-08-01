const Event = require("../models/Event");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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