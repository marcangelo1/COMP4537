import { NoteManager } from "./note_manager.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const addNoteButton = document.getElementById("add-note");

  if (notesContainer && addNoteButton) {
    const noteManager = new NoteManager();

    noteManager.notes.forEach((note) => {
      note.createNote(notesContainer);
    });

    addNoteButton.addEventListener("click", () => {
      noteManager.addNote("", notesContainer);
    });
  }
});
