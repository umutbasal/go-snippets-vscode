const fs = require('fs');
const path = require('path');
const process = require('process');
const snippetsFilePath = path.resolve(__dirname, './../go.json');
const mdFilePath = path.resolve(__dirname, '../README.md');



function getContent(filePath) {
    let snippetsFilePath = filePath;
    if (!fs.existsSync(snippetsFilePath)) {
        throw new RangeError("no file exists");
    }
    let contentBuffer = fs.readFileSync(snippetsFilePath, {
        encoding: 'utf8'
    });
    let content = contentBuffer.toString();
    return content;
}

console.log(getContent(snippetsFilePath).replace(/("prefix": "[a-z]{0,30}).*(\")/g, "$1$2"))