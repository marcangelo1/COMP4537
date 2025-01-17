import { indexTexts } from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", () => {

  const writerButton = document.getElementById("writer-button");
  const readerButton = document.getElementById("reader-button");
  const title = document.getElementById("title");
  const info = document.getElementById("info");

  title.textContent = indexTexts.title;
  info.textContent = indexTexts.info;
  writerButton.textContent = indexTexts.writerButtonText;
  readerButton.textContent = indexTexts.readerButtonText;

  writerButton.addEventListener("click", () => {
    location.href = "writer.html";
  });

  readerButton.addEventListener("click", () => {
    location.href = "reader.html";
  });
});
