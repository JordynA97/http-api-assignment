const fs = require('fs'); //file sync
const index = fs.readFileSync(`${__dirname}/../client/client.html`);//grab html
const style = fs.readFileSync(`${__dirname}/../client/style.css`);//grab css

const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type' : 'text.html' });
    response.write(index);
    response.end();
};

const getStyle = (request, response) => {
    response.writeHead(200, { 'Content-Type':'text/css' });
    response.write(style);
    response.end();
};

module.exports = {
    getIndex, getStyle
};