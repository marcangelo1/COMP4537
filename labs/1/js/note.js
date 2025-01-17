import { buttonTexts } from "../lang/messages/en/user.js";
import { writerTexts } from "../lang/messages/en/user.js";

export class Note {
  constructor(content = "", saveNoteCallback, removeNoteCallback) {
    this.content = content;
    this.element = null;
    this.saveNoteCallback = saveNoteCallback;
    this.removeNoteCallback = removeNoteCallback;
  }

  createNote(container) {
    this.element = this.#createAFieldForNote();
    container.appendChild(this.element);
  }

  #createAFieldForNote() {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note", "mb-3");

    const textArea = document.createElement("textarea");
    textArea.classList.add("form-control");
    textArea.rows = 3;
    textArea.value = this.content;

    textArea.addEventListener("input", (e) => {
      this.content = e.target.value;
      if (this.saveNoteCallback) {
        this.saveNoteCallback();
      }
    });

    const removeButton = this.#createRemoveButton(noteDiv);

    noteDiv.appendChild(textArea);
    noteDiv.appendChild(removeButton);

    return noteDiv;
  }

  #createRemoveButton(parentElement) {
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "mt-2");
    removeButton.textContent = buttonTexts.removeText;

    removeButton.addEventListener("click", () => {
      parentElement.remove();
      if (this.removeNoteCallback) {
        this.removeNoteCallback(this);
      }
    });

    return removeButton;
  }
}
