const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
    try {
        await writeFile('temp.txt', "Line 1\n");
        await writeFile('temp.txt', "Line 2\n", { flag: 'a' });
        await writeFile('temp.txt', "Line 3\n", { flag: 'a' });
        console.log("Finished writing this file.");

    } catch(error) {
       console.log("Error writing file occured:", error);

    }
}

const reader = async () => {
    try {
     const data = await readFile("temp.txt", "utf8");
     console.log(data); 

    } catch(error) {
        console.log("Error reading file occured:", error);

    }
}

const readWrite = async () => {
     await writer();
     await reader();
}

readWrite();