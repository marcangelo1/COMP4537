document.addEventListener("DOMContentLoaded", () => {
  const writerButton = document.getElementById("writer-button");
  const readerButton = document.getElementById("reader-button");

  // Attach event listeners for navigation
  writerButton.addEventListener("click", () => {
    location.href = "writer.html";
  });

  readerButton.addEventListener("click", () => {
    location.href = "reader.html";
  });
});
