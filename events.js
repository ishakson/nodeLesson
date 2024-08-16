const http = require("http");



const server = http.createServer();
server.on("request", (req, res) => {
    console.log("request received c");
    res.end("request received end");
})

server.on("request", (req, res) => {
    console.log(" another request received c");
})

server.on("close", (req, res) => {
    console.log("server closed");
})

server.listen(8000,"127.0.0.1", () => {
    console.log("listening for request on port 8000");
    setTimeout(() => {
        server.close();
    }, 5000);
});