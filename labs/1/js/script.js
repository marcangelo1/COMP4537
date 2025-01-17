import { indexTexts } from "../lang/messages/en/user.js";
import { buttonTexts } from "../lang/messages/en/user.js";

/*
This script manages the functionality and dynamic content of the homepage (index.html) for a note management application. It serves as a navigation hub for users to access the "Writer" and "Reader" pages.

This class was developed with the assistance of ChatGPT.
*/

document.addEventListener("DOMContentLoaded", () => {

  const writerButton = document.getElementById("writer-button");
  const readerButton = document.getElementById("reader-button");
  const title = document.getElementById("title");
  const info = document.getElementById("info");

  title.textContent = indexTexts.title;
  info.textContent = indexTexts.info;
  writerButton.textContent = buttonTexts.writerButtonText;
  readerButton.textContent = buttonTexts.readerButtonText;

  writerButton.addEventListener("click", () => {
    location.href = "writer.html";
  });

  readerButton.addEventListener("click", () => {
    location.href = "reader.html";
  });
});
