require('dotenv').config();
const express= require("express");
const router= express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const User = require("../model/userschema.js");

router.post("/register", async (req, res) => {

  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  });
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(200).json({status: 'success',
    token,
    user,
});
});

router.post("/login", async function(req, res){
  try {
      // check if the user exists
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        //check if password matches
        const result = req.body.password === user.password;
        if (result) {
          
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          return res.status(200).json({status: 'success',
            token,
            user,
          })

          // res.json({ Message: "Login successfully" });
        } else {
          res.status(400).json({ error: "password doesn't match" });
        }
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
});
module.exports = router;