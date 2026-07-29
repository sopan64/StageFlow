const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    coordinator: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    venue: {
        type: String,
        required: true,
    },

    members: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Slot", slotSchema);