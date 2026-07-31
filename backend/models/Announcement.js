const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },

    message:{
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Announcement", announcementSchema);