const User = require("../models/User");

const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

        res.status(201).json(createdUser);
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