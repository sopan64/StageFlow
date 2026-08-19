const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Slot", slotSchema);