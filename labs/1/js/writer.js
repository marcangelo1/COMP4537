import { NoteManager } from "./note_manager.js";
import { writerTexts } from "../lang/messages/en/user.js";
import { buttonTexts } from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const addNoteButton = document.getElementById("add-button");
  addNoteButton.textContent = buttonTexts.addNoteButton;

  const lastSaveTime = document.createElement("div");

  const pageTitle = document.getElementById("page-title")
  pageTitle.textContent = writerTexts.PageTitle;
  const pageInfo = document.getElementById("page-info")
  pageInfo.textContent = writerTexts.PageInfo
  const homeButton = document.getElementById("home-button");
  homeButton.textContent = buttonTexts.backButtonText;
  
  homeButton.addEventListener("click", () => {
    location.href = "index.html";
  });

  

  lastSaveTime.classList.add("text-secondary", "mt-2");
  notesContainer.parentElement.insertBefore(lastSaveTime, notesContainer);

  const updateTime = () => {
    const time = localStorage.getItem("lastUpdated");
    if (time) {
      const formattedTime = new Date(time).toLocaleString();
      lastSaveTime.textContent = `${writerTexts.storeText}${formattedTime}`;
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
