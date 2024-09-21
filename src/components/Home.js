import React from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import Notes from "./Notes";

const Home = () => {

  const context = useContext(NoteContext);
  const {notes,setNotes} = context;
  return (
    <>
    <Notes/>
    </>
  );
};

export default Home;
