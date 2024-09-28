const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'myNoteBookjs';  

//Add success to all the url requests

// Route - 1 => Create a User using POST "/api/auth". It Doesn't requires authentication (NO LOGIN)

//Setting validators to each of the fields
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name!").isLength({ min: 3 }),
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password Cannot be blank and it should have a min length of 5!").isLength({ min: 5 }),
    body("gender", "Enter a valid gender!").isLength({ min: 4 }),
    body("dob", "Enter a valid date(YYYY-MM-DD)!").isDate(),
  ],
  async (req, res) => {
    //No error => Create User
    //Error => Returning the error message
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      //Check whether the provided email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success,
            error : "User with this email already exists.Try using another one..."}
          );
      }

      //Generating salt and hashing the password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password,salt);

      //Creating the User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
        gender: req.body.gender,
        dob: req.body.dob,
      });

      const data = {
        user : {
          id : user.id
        }
      };

      const authenticationToken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success, authenticationToken})

      // res.json(req.body);


    } catch (error) {
      res.status(500).json({success,error : "Internal Server Error!"});
      console.error(error.message);
    }

    // .then(user => res.json(user))
    // .catch(err => {
    //         console.log(err);
    //         res.send({"error" : "An account with the provided email already exists, Try another one...", "message": err.message })
    //     });

    // const user = User(req.body);
    // user.save();
    // console.log(req.body);\
  }
);


//Route - 2 =>User Login using POST "/api/auth/login". It Doesn't requires authentication (NO LOGIN)

//Setting validators to each of the fields
router.post(
  "/login",
  [
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Password Cannot be blank and it should have a min length of 5!").isLength({ min: 5 }),
  ],
  async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, error : 'Login With Appropriate Credentials!'});
    }

    const {email, password} = req.body;

    try{
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({ success, error: 'Login With Appropriate Credentials!' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if(!passwordCompare){
        return res.status(400).json({ success, error: 'Login With Appropriate Credentials!' });
      }

     
      const data = {
        user : {
          id : user.id
        }
      };
      success = true;
      const authenticationToken = jwt.sign(data,JWT_SECRET);
      res.json({success, authenticationToken});
    
    }catch(err){
      res.status(500).json("Internal Server Error!");
      console.error(err.message);
    }

  })

//Route - 3 =>Getting User Data GET "/api/auth/getuser". Requires authentication (LOGIN REQUIRED)


router.get( '/getuser',fetchuser, async (req, res) => {

  // Here the fetchuser is a middleware which is used to get the token from the client and verify it

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');    
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({error : 'Internal Server Error!'})
  }
})


module.exports = router;
