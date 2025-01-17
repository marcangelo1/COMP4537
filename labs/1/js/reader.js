document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");

  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

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
      noteDiv.style.wordWrap = "break-word";
      noteDiv.style.whiteSpace = "pre-wrap";
      notesContainer.appendChild(noteDiv);
    });
  }
});
