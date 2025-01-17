// Notes array to store instances of the Note class
let notes = [];

// Get references to DOM elements
const notesContainer = document.getElementById("notes-container");
const addNoteButton = document.getElementById("add-note");

// Note Class
class Note {
  constructor(content = "") {
    this.content = content; // Note content
    this.element = null; // DOM element for this note
    this.createElement(); // Create the DOM representation
  }

  // Create the DOM elements for the note
  createElement() {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    // Textarea for note content
    const textArea = document.createElement("textarea");
    textArea.value = this.content;
    textArea.addEventListener("input", (e) => {
      this.content = e.target.value; // Update content in real time
      saveNotes(); // Save all notes to localStorage
    });

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      this.remove();
    });

    // Append textarea and remove button to the note div
    noteDiv.appendChild(textArea);
    noteDiv.appendChild(removeButton);

    // Add the note div to the DOM and store the element
    notesContainer.appendChild(noteDiv);
    this.element = noteDiv;
  }

  // Remove this note from the DOM and notes array
  remove() {
    this.element.remove(); // Remove from DOM
    notes = notes.filter((note) => note !== this); // Remove from array
    saveNotes(); // Save changes to localStorage
  }
}

// Add a new note to the DOM and `notes` array
addNoteButton.addEventListener("click", () => {
  const note = new Note(""); // Create a new note instance
  notes.push(note); // Add to notes array
  saveNotes(); // Save all notes to localStorage
});

// Load notes from localStorage on page load
window.onload = () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach((noteData) => {
    const note = new Note(noteData.content); // Create a new note instance
    notes.push(note); // Add to notes array
  });
};

// Save all notes to localStorage
function saveNotes() {
  const noteData = notes.map((note) => ({ content: note.content }));
  localStorage.setItem("notes", JSON.stringify(noteData));
}
