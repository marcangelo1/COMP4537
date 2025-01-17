document.addEventListener("DOMContentLoaded", () => {

  const writerButton = document.getElementById("writer-button");
  const readerButton = document.getElementById("reader-button");

  writerButton.addEventListener("click", () => {
    location.href = "writer.html";
  });

  readerButton.addEventListener("click", () => {
    location.href = "reader.html";
  });
});
