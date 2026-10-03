const express = require("express");
const router = express.Router();

const SlotBooking = require("../models/SlotBooking");
const Slot = require("../models/Slot");
const auth = require("../middleware/auth");

function isValidTime(time) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

router.post("/", auth, async (req, res) => {
    try {
        const { slotId, startTime, endTime } = req.body;

        if (!isValidTime(startTime) || !isValidTime(endTime)) {
            return res.status(400).json({
                message: "Invalid time format. Use HH:MM."
            });
        }

        const slot = await Slot.findById(slotId);

        if (!slot) {
            return res.status(404).json({
                message: "Slot not found!"
            });
        }

        if (slot.coordinator.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not the coordinator of this slot!"
            });
        }

        if (startTime >= endTime) {
            return res.status(400).json({
                message: "End time must be after start time!"
            });
        }

        const existingBooking = await SlotBooking.findOne({
            slot: slotId,
            expiresAt: { $gt: new Date() }
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "This slot is already booked for today!"
            });
        }

        const now = new Date();

        const existingBookings = await SlotBooking.find({
            expiresAt: { $gt: now }
        });

        for (const booking of existingBookings) {

            if (
                startTime < booking.endTime &&
                endTime > booking.startTime
            ) {
                return res.status(400).json({
                    message:
                        "This timing overlaps with another booked slot. Please select another timing."
                });
            }
        }

        const expiresAt = new Date();
        expiresAt.setHours(24, 0, 0, 0);

        const booking = await SlotBooking.create({
            slot: slotId,
            startTime,
            endTime,
            bookedBy: req.user.id,
            expiresAt
        });

        res.status(201).json({
            message: "Slot booked successfully!",
            booking
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const now = new Date();

        const bookings = await SlotBooking.find({
            expiresAt: { $gt: now }
        })
        .populate("slot", "title")
        .populate("bookedBy", "name email");

        res.status(200).json(bookings);

    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const booking = await SlotBooking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found!"
            });
        }

        if (booking.bookedBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own booking!"
            });
        }

        await SlotBooking.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Booking deleted successfully!"
        });

    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;