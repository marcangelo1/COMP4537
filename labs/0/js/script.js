import { Game } from "./game.js"
import { UI } from "./ui.js"

const gameUI = new UI("colored-buttons-container", "input-box", "go-button", "guess-message");
const memoryGame = new Game(gameUI)
