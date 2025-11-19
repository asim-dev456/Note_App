const {
  addNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const authMiddleware = require("../middlewares/authMiddleware");

const routerNote = require("express").Router();

routerNote.post("/addnote", authMiddleware, addNote);
routerNote.get("/getmynotes", authMiddleware, getNotes);
routerNote.put("/updatenote/:id", authMiddleware, updateNote);
routerNote.delete("/deletenote/:id", authMiddleware, deleteNote);

module.exports = routerNote;
