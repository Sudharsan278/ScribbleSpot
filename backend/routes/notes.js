const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { findById } = require("../models/User");

//Route - 1 => Fetching all the notes of the user "/api/notes/getallnotes". Requires authentication (LOGIN REQUIRED)
router.get("/getallnotes", fetchuser, async (req, res) => {
  try {
    //Get all the notes of the specified user using the fetchuser
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json("Internal Server Error!");
    console.error(error.message);
  }
});

//Route - 2 => Adding a note "/api/notes/addnote". Requires authentication (LOGIN REQUIRED)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a valid description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      //Get the values from the request body
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Creating and inserting the values into a note object
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      res.status(500).json("Internal Server Error!");
      console.error(error.message);
    }
  }
);

//Route - 3 => Updating a note "/api/notes/updatenote/:id". Requires authentication (LOGIN REQUIRED)
router.put(
  "/updatenote/:id",
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a valid description").isLength({ min: 10 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      //Get the values that are to be updated
      const { title, description, tag } = req.body;
      //Creating an empty note object
      const newNote = {};

      //Storing the updated values into the note object
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //Find the note that has to be updated
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found1!");
      }
      //If the userId doesn't matches do not allow to update
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("UnAuthorized Access!");
      }
      //Updating the values
      const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json("Internal Server Error!");
      console.error(error.message);
    }
  }
);

//Route - 4 => Deleting a specific note using DELETE Request (/api/notes/deletenote/:id). LOGIN REQUIRED

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json("Not Found");
    }

    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("UnAuthorized Access!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ status: "Note Deleted Successfully!", note: note });
  } catch (error) {
    res.status(500).json("Internal Server Error!");
    console.error(error.message);
  }
});

//Route - 5 => Route to display the entire description after clicking the Read More Button(/api/notes/getentirenote/id) [LOGIN REQUIRED]

router.get("/getentirenote/:id", fetchuser, async(req,res) => {
  let note;
  try {
     note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json("Not Found");
    }

    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("UnAuthorized Access!");
    }

    res.json({ status: "Note Fetched Successfully", note: note });
  } catch (error) {
    res.status(500).json("Internal Server Error!///");
    console.error(error.message);
    console.log(req.note);
  }
})


module.exports = router;
