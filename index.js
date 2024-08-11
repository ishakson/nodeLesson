const fs = require("fs");
const http = require("http");


const server = http.createServer((req, res) => {
    console.log(req)
    res.end("hello world");
    
})
server.listen(8000, "127.0.0.1", () => {
    console.log("listening to requests on port 8000");
})