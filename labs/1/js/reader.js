import { buttonTexts } from "../lang/messages/en/user.js";
import { readerTexts } from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const lastSaveTime = document.createElement("div");
  lastSaveTime.classList.add("text-secondary", "mt-2");

  const homeButton = document.getElementById("home-button");
    homeButton.textContent = buttonTexts.backButtonText;
  
    homeButton.addEventListener("click", () => {
      location.href = "index.html";
    });
  
  const pageTitle = document.getElementById("page-title")
  pageTitle.textContent = readerTexts.PageTitle;
  const pageInfo = document.getElementById("page-info")
  pageInfo.textContent = readerTexts.PageInfo
  
  
  notesContainer.parentElement.insertBefore(lastSaveTime, notesContainer);

  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  const updateTime = () => {
    const time = localStorage.getItem("lastUpdated");
    if (time) {
      const formattedTime = new Date(time).toLocaleString();
      lastSaveTime.textContent = `${readerTexts.updatedText}${formattedTime}`;
    }
  };

  if (savedNotes.length === 0) {
    notesContainer.innerHTML = `<p class="text-muted">${readerTexts.noNotesText}</p>`;
  } else {
    savedNotes.forEach((note) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add(
        "note",
        "border",
        "rounded",
        "mb-3",
        "p-3",
        "bg-light",
        "text-start"
      );
      noteDiv.textContent = note.content;
      noteDiv.style.overflowWrap = "break-word";
      noteDiv.style.whiteSpace = "pre-wrap";
      notesContainer.appendChild(noteDiv);
    });

    updateTime();

    setInterval(updateTime, 2000);
  }
});
