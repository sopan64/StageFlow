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

    date: {
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
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Slot", slotSchema);