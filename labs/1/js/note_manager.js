import { Note } from "./note.js";

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
