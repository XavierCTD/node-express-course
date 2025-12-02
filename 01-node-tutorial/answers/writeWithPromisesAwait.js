const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
    try {
        await writeFile('temp.txt', "Line 1\nLine 2\nLine 3\n");
        console.log("Finished writing this file.");

    } catch(error) {
       console.log("Error writing file occured:", error);

    }
}

const reader = async () => {
    try {
     await readFile("temp.txt", "utf8");
     console.log("Finished reading this file."); 

    } catch(error) {
        console.log("Error reading file occured:", error);

    }
}

const readWrite = async () => {
     await writer();
     await reader();
}

readWrite();