const Slot = require("../models/Slot");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const slots = await Slot.find();

        res.status(200).json(slots);
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const newSlot = await Slot.create(req.body);

        res.status(201).json({
            message: "Slot created successfully!",
            slot: newSlot,
        });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedSlot = await Slot.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        if(!updatedSlot){
            return res.status(404).json({
                message: "Slot not found!"
            });
        }

        res.json({
            message: "Slot updated successfully",
            slot: updatedSlot
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {

        const deletedSlot = await Slot.findByIdAndDelete(req.params.id);

        if (!deletedSlot) {
            return res.status(404).json({
                message: "Slot not found!"
            });
        }

        res.json({
            message: "Slot deleted successfully!",
            slot: deletedSlot
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;