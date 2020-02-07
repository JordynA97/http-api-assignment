const http = require('http'); 
const url = require('url');
const htmlHandler = require('./htmlResponses.js');//handler for html responses
const jsonHandler = require('./jsonResponses.js');//handler for json responses

const port = process.env.PORT || process.env.NODE_PORT || 3000;//set the port to local

const urlStructure = {
    HEAD: {
        '/getUsers' : jsonHandler.getUsersMeta,
        notFound: jsonHandler.getUsersMeta,
    },
    GET: {
        '/': htmlHandler.getIndex, 
        '/style.css': htmlHandler.getStyle,
        '/success': jsonHandler.success,
        notFound: jsonHandler.notFound, //404
    },
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const contentType = request.headers.accept.split(',')[0];
    const params = query.parse(parsedUrl.query);

    if(urlStructure[parsedUrl.pathname]){
        urlStructure[parsedUrl.pathname](request, response, type, params);
    }else{
        urlStructure.notFound(request, response);
    }
};

//create the server
http.createServer(onRequest).listen(port);

console.log(`Currently listening on ${port}`)