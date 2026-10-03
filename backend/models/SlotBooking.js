const mongoose = require("mongoose");

const slotBookingSchema = new mongoose.Schema({

    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot",
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});

slotBookingSchema.index(
    {expireAt : 1},
    {expireAfterSeconds : 0}
);

module.exports = mongoose.model("SlotBooking", slotBookingSchema);