const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/myNoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
    }catch(error){
        console.log("Error Occured! ", error)
    }}

module.exports = connectToMongo;