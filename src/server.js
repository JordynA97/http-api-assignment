const http = require('http');
const url = require('url');
const query = require('query-string');
const htmlHandler = require('./htmlResponses.js');// handler for html responses
const jsonHandler = require('./jsonResponses.js');// handler for json responses

const port = process.env.PORT || process.env.NODE_PORT || 3000;// set the port to local

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound, // 404
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.getUsersMeta,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const type = request.headers.accept.split(',')[0];
  const params = query.parse(parsedUrl.query)

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, type, params);
  } else{
    urlStruct[request.method].notFound(request, response, type, params);
  }
};

// create the server
http.createServer(onRequest).listen(port);

console.log(`Currently listening on ${port}`);
