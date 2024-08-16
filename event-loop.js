const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;//for mac or linux
setTimeout(() => {
  console.log("timer 1 finished");
}, 0);

setImmediate(() => {
  console.log("immediate 1 finished");
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  setTimeout(() => {
    console.log("timer 2 finished");
  }, 0);

  setTimeout(() => {
    console.log("timer 3 finished");
  }, 3000);
  setImmediate(() => {
    console.log("immediate2 finished");
  });
  process.nextTick(() => {
    console.log("nextTick finished");
  });
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");

  console.log(Date.now() - start, "password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");

  console.log(Date.now() - start, "password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");

  console.log(Date.now() - start, "password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");

  console.log(Date.now() - start, "password encrypted");


});

console.log("Hello from the top-level code");
