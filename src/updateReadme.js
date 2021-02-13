const fs = require('fs');
const path = require('path');
const process = require('process');
const snippetsFilePath = path.resolve(__dirname, './../go.json');
const mdFilePath = path.resolve(__dirname, '../README.md');
// process.on('uncaughtException', function (err) {
   // console.log('Caught Exception:' + err);
//});

function update() {
    let content = getContent(snippetsFilePath);
    let obj = JSON.parse(content);
    let entries = Object.entries(obj);
    let mdContent = "";
    mdContent += getHeader();
    mdContent += getTableHeader();
    mdContent += getTableContent();
    entries.map(v => {
        mdContent += getTrContent(v[1].prefix, v[1].description);
    });
    let writeStream = fs.createWriteStream(mdFilePath, {
        flags: 'w+',
        encoding: "utf8"
    });
    writeStream.write(mdContent, 'utf8');
    writeStream.on('error', function (err) {
        console.log(err);
    });
    writeStream.end();
}

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


function getHeader() {
    return "#Go Sniper\r\n## Usage\r\n";
}

function getTableHeader() {
    return '|prefix|description|\r\n';
}

function getTableContent() {
    return "|---|---|\r\n";
}

function getTrContent(prefix, description) {
    return `|${prefix}|${description}|\r\n`;
}

update();
