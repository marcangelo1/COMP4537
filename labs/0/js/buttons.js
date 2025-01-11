/*
Button class implementation for creating dynamic buttons with random colors and click handlers.
This code was implemented with assistance from ChatGPT. 
*/
export class Button {
  constructor(buttonNumber, buttonContainer, clickHandler) {
    this.element = document.createElement("button")
    this.element.dataset.content = buttonNumber
    this.element.id = buttonNumber
    this.element.textContent = buttonNumber
    this.element.style.backgroundColor = this.generateRandomColor()

    this.element.addEventListener("click", () => clickHandler(this))

    buttonContainer.appendChild(this.element)
  }

  generateRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color
  }
}