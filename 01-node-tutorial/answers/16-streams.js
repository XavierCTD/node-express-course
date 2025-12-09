const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
    encoding: "utf8",
    highWaterMark: 200,
});

let counter = 0;

stream.on("data", (chunk) => {
  counter++;
  console.log(chunk);
});

stream.on("end", () => {
  console.log(`\nNumber of chunks received: ${counter}`); 
});

stream.on("error", (err) => {
  console.log('There seems to be an error:', err)
});