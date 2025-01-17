import { NoteManager } from "./note_manager.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const addNoteButton = document.getElementById("add-note");
  const lastSaveTime = document.createElement("div");
  lastSaveTime.classList.add("text-secondary", "mt-2");
  notesContainer.parentElement.insertBefore(lastSaveTime, notesContainer);

  const updateTime = () => {
    const time = localStorage.getItem("lastUpdated");
    if (time) {
      const formattedTime = new Date(time).toLocaleString();
      lastSaveTime.textContent = `Stored at: ${formattedTime}`;
    }
  };

  if (notesContainer && addNoteButton) {
    const noteManager = new NoteManager();

    noteManager.notes.forEach((note) => {
      note.createNote(notesContainer);
    });

    addNoteButton.addEventListener("click", () => {
      noteManager.addNote("", notesContainer);
      updateTime();
    });

    setInterval(updateTime, 2000);
  }

  updateTime();
});
