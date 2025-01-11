import { Button } from "./buttons.js";

/* 
UI class for managing the game's user interface elements and interactions.
This class handles the creation and management of buttons, scrambling their positions,
hiding or showing button content, displaying messages, and managing the "Go" button's state.
*/
export class UI {
  constructor(buttonContainer, inputBoxId, goButtonId, messageBoardID) {
    this.container = document.getElementById(buttonContainer);
    this.inputBox = document.getElementById(inputBoxId);
    this.goButton = document.getElementById(goButtonId);
    this.message = document.getElementById(messageBoardID);
    this.isScrambling = false;
  }

  onGoButtonClick(callback) {
    // Add an event listener to a button. 
    this.goButton.addEventListener("click", callback);
  }

  getNumberOfButtons() {
    /* Return the number of buttons which we got from the input box. */
    return parseInt(this.inputBox.value);
  }

  createButtons(clickHandler, numbersArray) {
    /* Instantiate a button based on the numbers in the array.*/
    this.clearButtons();

    numbersArray.forEach((number) => {
      new Button(number, this.container, clickHandler)
    })
  }

  clearButtons() {
    /* Clear the button container */
    this.container.innerHTML = "";
  }

  getButtons() {
    /* Returns all the buttons within the container as an array of DOM elements. */

    return Array.from(this.container.children);
  }

  scrambleButtons() {
    /*
      Scrambles the positions of the buttons within the visible area of the container,
      ensuring that no button goes outside the container's boundaries.
    */
    const containerDimension = this.container.getBoundingClientRect();
    const containerPadding =
      parseFloat(getComputedStyle(this.container).padding) || 0;

    this.getButtons().forEach((button) => {
      const maxLeft =
        containerDimension.width - button.offsetWidth - containerPadding;
      const maxTop =
        containerDimension.height - button.offsetHeight - containerPadding;

      const randomLeft = Math.random() * maxLeft;
      const randomTop = Math.random() * maxTop;

      button.style.position = "absolute";
      button.style.left = `${randomLeft}px`;
      button.style.top = `${randomTop}px`;
    });
  }

  hideButtonContent() {
    this.getButtons().forEach((button) => {
      button.textContent = ""
      button.disabled = false
    })
  }

  showButtonContentAndDisableButtons() {
    this.getButtons().forEach((button) => {
      button.textContent = button.dataset.content;
      button.disabled = true
    })
  }

  displayMessage(messageToDisplay) {
    this.message.textContent = messageToDisplay;
  }
  
  disableGoButton(boolean) {
    this.goButton.disabled = boolean 
  }
  
}
