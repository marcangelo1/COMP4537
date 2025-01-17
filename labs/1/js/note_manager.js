import { Note } from "./note.js";

/*
The NoteManager class provides functionality to manage notes. It enables creating, storing, and removing notes while maintaining persistence using localStorage.

This class was developed with the assistance of ChatGPT.
*/

export class NoteManager {
  constructor() {
    this.notes = [];
    this.#loadNotes();
  }

  addNote(content = "", container) {
    const note = new Note(
      content,
      this.#saveNotes.bind(this),
      this.#removeNote.bind(this)
    );
    this.notes.push(note);
    note.createNote(container);
    this.#saveNotes();
  }

  #removeNote(note) {
    this.notes = this.notes.filter((n) => n !== note);
    this.#saveNotes();
  }

  #saveNotes() {
    const serializedNotes = this.notes.map((note) => ({
      content: note.content,
    }));
    localStorage.setItem("notes", JSON.stringify(serializedNotes));
    localStorage.setItem("lastUpdated", new Date().toISOString());
  }

  #loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    this.notes = savedNotes.map(
      (noteData) =>
        new Note(
          noteData.content,
          this.#saveNotes.bind(this),
          this.#removeNote.bind(this)
        )
    );
  }
}
