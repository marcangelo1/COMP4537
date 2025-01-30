const http = require("http");
const fileSystem = require("fs"); // Used for reading and writing to a file
const path = require("path");

const { getDate } = require("./modules/utils");
const { message: messageTemplate } = require("./lang/en/en");

const server = http.createServer((req, res) => {
  // Parse the request url to node.js server
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/getDate/") {
    // Get the passed name from the url
    const name = url.searchParams.get("name");

    const message = messageTemplate
      .replace("%name%", name)
      .replace("%date%", getDate());

    // Send a status code of 200 and a key value pair text/html so that the browser renders the response as HTML.
    res.writeHead(200, { "Content-Type": "text/html" });
    // Final response to the client.
    res.end(`<span style="color:blue;">${message}</span>`);
  } else if (url.pathname.startsWith("/readFile/")) {
    // Extract the filename from the URL
    const fileName = url.pathname.replace("/readFile/", "").trim();

    // Prevent directory traversal attack (e.g., /readFile/../../etc/passwd)
    const filePath = path.join(__dirname, fileName);

    // Check if the file exists
    fileSystem.access(filePath, fileSystem.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`404: ${fileName} does not exist.`);
      } else {
        // Read and return the file content
        fileSystem.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500: Internal Server Error");
          } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
          }
        });
      }
    });
  } else if (url.pathname === "/writeFile/") {
    const text = url.searchParams.get("text");
    const filePath = path.join(__dirname, "file.txt");
    console.log(filePath);
    fileSystem.appendFile(filePath, text + "\n", (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500: Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Text successfully written to the file!");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404: Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
