const User = require("../models/User");

const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

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

        const createdUser = await User.create(newUser);

        res.json(createdUser);
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.post("/login", async(req, res) => {
    try{
        const isExisting = await User.findOne({email: req.body.email});

        if(!isExisting){
            return res.status(404).json({
                message: "Invalid email or password!"
            });
        }
        
        const isMatch = await bcrypt.compare(req.body.password, isExisting.password);

        if(!isMatch){
            return res.status(404).json({
                message: "Invalid email or password!"
            });
        }
        const userData = {
            name: isExisting.name,
            email: isExisting.email,
            role: isExisting.role
        }

        res.status(201).json(userData);
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});



module.exports = router;