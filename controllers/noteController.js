const noteModel = require("../models/noteModel");

// add note

const addNote = async (req, res) => {
  const { title, description } = req.body;

  await noteModel.create({
    title,
    description,
    user: req.user._id,
  });
  res.status(201).json({ message: "Note Created Successfully" });
};

//get my notes
const getNotes = async (req, res) => {
  const notes = await noteModel.find({ user: req.user._id });
  res.status(200).json({ message: "Note Fetched Successfully", notes });
};

//update note

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, {
    title,
    description,
  });
  res.status(200).json({ message: "Note Updated Successfully" });
};

//delete note

const deleteNote = async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Note Deleted Successfully" });
};

module.exports = { addNote, getNotes, updateNote, deleteNote };
