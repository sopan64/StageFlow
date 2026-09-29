const User = require("../models/User");

const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/search", auth, admin, async (req, res) => {
    try {
        const users = await User.find({
            email: { $regex: req.query.email, $options: "i" }
        }).select("-password");

        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.get("/", auth, async(req, res) => {
    try{
        const users = await User.find().select("-password");

        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.put("/:id/manage-role", auth, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        user.role = user.role === "admin" ? "member" : "admin";
        await user.save();

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.delete("/:id", auth, admin, async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).json({
                message: "User not found!"
            });
        }

        res.json({
            message: "User deleted successfully!"
        });
    }
    catch(err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.post("/register", async(req, res) => {
    try{
        const existingUser = await User.findOne({email: req.body.email});

        if(existingUser){
            return res.status(400).json({
                message: "Email already exists!"
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: "member"
        }

        await User.create(newUser);

        res.status(201).json({
            message: "Registration successful!"
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }
        
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        res.status(200).json({
            token,
            user: userData
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;