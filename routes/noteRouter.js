const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");

router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getNote);

router.post("/", notesController.createNotes);

router.put("/:id", notesController.editNote);
router.delete("/:id", notesController.deleteNote);

module.exports = router;
