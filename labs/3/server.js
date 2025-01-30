const http = require("http");

const { getDate } = require("./modules/utils");
const { message: messageTemplate } = require('./lang/en/en');

const server = http.createServer((req, res) => {

  // Parse the request url to node.js server
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/getDate/') {
    // Get the passed name from the url
    const name = url.searchParams.get("name");

    const message = messageTemplate.replace('%name%', name).replace('%date%', getDate())

    // Send a status code of 200 and a key value pair text/html so that the browser renders the response as HTML.
    res.writeHead(200, { "Content-Type": "text/html" });
    // Final response to the client.
    res.end(`<span style="color:blue;">${message}</span>`)
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404: Not Found");
  }
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})