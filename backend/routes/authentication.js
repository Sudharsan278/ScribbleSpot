const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


//Create a User using POST "/api/auth". It Doesn't requires authentication
router.post('/', [
    body('name', 'Enter a valid name!').isLength({ min: 3 }),
    body('email','Enter a valid email!').isEmail(),
    body('password','Enter a password of min length 5!').isLength({ min: 5 }),
    body('gender','Enter a valid gender!').isLength({ min: 4 }),
    body('dob','Enter a valid date(YYYY-MM-DD)!').isDate()
], (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const user = User(req.body); 
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender:req.body.gender,
        dob : req.body.dob
      }).then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.send({"error" : "An account with the provided email already exists, Try another one...", "message": err.message })
        });
  
    // user.save();
    // console.log(req.body);
    // res.send("hello bro!");
});

module.exports = router 