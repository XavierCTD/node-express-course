const { writeFile, readFile } = require('fs').promises;

writeFile("temp.txt", "Line 1\n")

.then(() => {
    return writeFile("temp.txt", "Line 2\n", { flag: "a" });
})
.then(() => {
    return writeFile("temp.txt", "Line 3\n", { flag: "a" });
})
.then(() => {
    return readFile("temp.txt", "utf8");
})
.then((data) => {
  console.log("Contents of temp.txt:");
  console.log(data);
})
.catch((error) => {
  console.log("An error occured:", error);
});