const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//REGISTER USER
router.post("/register", async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        console.log("Body",req.body);

        if(!email || !password){
            return res.status(400).json({ message: "Email and Password is requires" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exist "});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully! Plese Login" });
    }
    catch(error){
        res.status(500).json({ message: "Registration Failed !" , error});
    }
});


//LOGIN USER
router.post("/login", async (req, res) =>{
    try{
        const { email, password } = req.body;

        if( !email || !password ){
            return res.status(400).json({ message: "Enter the email and Password" });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "This is mailId not Registered" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.status(200).json({ message: "Login Successfull", token ,name: user.name});
    }
    catch(error){
        console.log("LOGIN ERROR", error);
        res.status(500).json({ message: "Login Failed", error });
    }
});

module.exports = router;