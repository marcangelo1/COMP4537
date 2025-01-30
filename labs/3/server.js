const http = require("http");
const fileSystem = require("fs"); // Used for reading and writing to a file
const path = require("path");

const { getDate } = require("./modules/utils");
const { message: messageTemplate } = require("./lang/en/en");

const server = http.createServer((req, res) => {
  // Parse the request URL
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Ensure all routes start with /COMP4537/labs/3/
  if (url.pathname.startsWith("/COMP4537/labs/3/")) {
    const route = url.pathname.replace("/COMP4537/labs/3/", "").trim(); // Extract the specific route

    if (route === "getDate/") {
      const name = url.searchParams.get("name");

      const message = messageTemplate
        .replace("%name%", name)
        .replace("%date%", getDate());

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<span style="color:blue;">${message}</span>`);
    } else if (route.startsWith("readFile/")) {
      // Extract the filename from the route
      const fileName = route.replace("readFile/", "").trim();
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
    } else if (route.startsWith("writeFile/")) {
      const text = url.searchParams.get("text");
      if (!text) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("400: Bad Request - Missing 'text' parameter");
        return;
      }

      const filePath = path.join(__dirname, "file.txt");
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
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404: Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
