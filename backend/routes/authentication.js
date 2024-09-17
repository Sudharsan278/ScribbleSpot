const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using POST "/api/auth". It Doesn't requires authentication (NO LOGIN)

//Setting validators to each of the fields
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name!").isLength({ min: 3 }),
    body("email", "Enter a valid email!").isEmail(),
    body("password", "Enter a password of min length 5!").isLength({ min: 5 }),
    body("gender", "Enter a valid gender!").isLength({ min: 4 }),
    body("dob", "Enter a valid date(YYYY-MM-DD)!").isDate(),
  ],
  async (req, res) => {
    //No error => Create User
    //Error => Returning the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether the provided email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json(
            "User with this email already exists. Try Using another one..."
          );
      }
      //Creating the User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        dob: req.body.dob,
      });

      res.json(req.body);
    } catch (err) {
      res.status(500).json("Some Unaccepted Error Occured!");
      console.err(err.message);
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

module.exports = router;
