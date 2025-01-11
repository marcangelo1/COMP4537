import { winScenario, invalidInputs, getGameOverMessage } from "../lang/messages/en/user.js";

/*
Game class implementation for managing a button-based game with random scrambling and ordered selection.
This code was implemented with assistance from ChatGPT.
*/
export class Game {
  constructor(UI) {
    this.gameUI = UI;
    this.gameUI.onGoButtonClick(() => this.startGame());

    this.buttonOrder = [];
    this.currentIndex = 0;
    this.isGameActive = false;
  }

  async startGame() {
    /* 
    This function initializes and starts the game. It handles:
    1. Disabling the "Go" button to prevent multiple starts.
    2. Clearing the button container to reset the game UI.
    3. Validating the number of buttons input and displaying an error message for invalid inputs.
    4. Creating a randomized order of buttons.
    5. Activating the scrambling effect in the UI before the game begins.
    6. Hiding the button content to challenge the player after scrambling.
    */
    this.gameUI.disableGoButton(true);
    this.gameUI.displayMessage("");
    this.gameUI.clearButtons();
    this.buttonOrder = [];

    const numberOfButtons = parseInt(this.gameUI.getNumberOfButtons());

    if (
      isNaN(numberOfButtons) ||
      numberOfButtons <= 3 ||
      numberOfButtons >= 7
    ) {
      this.gameUI.displayMessage(invalidInputs.outOfRangeMessage);
      this.gameUI.disableGoButton(false);
      return;
    }

    for (let i = 1; i <= this.gameUI.getNumberOfButtons(); i++) {
      this.buttonOrder.push(i);
    }

    this.buttonOrder = this.shuffleArray(this.buttonOrder);

    this.gameUI.createButtons(
      this.handleButtonClick.bind(this),
      this.buttonOrder
    );

    await this.pause(numberOfButtons * 1000);

    for (let i = 0; i < this.gameUI.getNumberOfButtons(); i++) {
      this.gameUI.isScrambling = true;
      this.gameUI.scrambleButtons();
      await this.pause(2000);
      this.gameUI.isScrambling = false;
    }

    this.isGameActive = true;
    this.gameUI.hideButtonContent();
  }

  pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  handleButtonClick(button) {
    /*
    This function handles button clicks during the game.
    It allows the button to display the correct number and disables it if the click is correct.
    If the sequence is completed successfully, the player wins.
    If the click is incorrect, the game ends and the correct sequence is displayed.
    */
    if (this.gameUI.isScrambling || !this.isGameActive) return;

    const buttonValue = parseInt(button.element.dataset.content);

    if (buttonValue === this.buttonOrder[this.currentIndex]) {
      button.element.textContent = buttonValue;
      button.element.disabled = true;
      this.currentIndex++;

      if (this.currentIndex === this.buttonOrder.length) {
        this.gameUI.displayMessage(winScenario.winMessage);
        this.currentIndex = 0;
        this.gameUI.disableGoButton(false);
        this.isGameActive = false;
      }
    } else {
      this.gameUI.showButtonContentAndDisableButtons();
      this.gameUI.displayMessage(
        getGameOverMessage(this.buttonOrder.join(", "))
      );
      this.gameUI.disableGoButton(false);
      this.isGameActive = false;
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}