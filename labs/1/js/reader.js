document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const lastSaveTime = document.createElement("div");
  lastSaveTime.classList.add("text-secondary", "mt-2");
  notesContainer.parentElement.insertBefore(lastSaveTime, notesContainer); // Place the time above the notes

  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  const updateTime = () => {
    const time = localStorage.getItem("lastUpdated");
    if (time) {
      const formattedTime = new Date(time).toLocaleString();
      lastSaveTime.textContent = `Updated at: ${formattedTime}`;
    }
  };

  if (savedNotes.length === 0) {
    notesContainer.innerHTML = '<p class="text-muted">No notes available.</p>';
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
