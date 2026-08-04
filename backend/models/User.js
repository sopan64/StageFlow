const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["member", "admin", "slot coordinator"],
        default: "member"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);