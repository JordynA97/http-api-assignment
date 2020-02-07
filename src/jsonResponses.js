const respond = (request, response, status, data, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(data);
  response.end();
};

// want different interactions for different responses/server reactions
const success = (request, response, type) => {
  if (type === 'text/xml') {
    const responseXML = '<response><message>Successful Message</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // send back the json
  const responseJSON = {
    message: 'Successful Message',
  };

  // let JSONString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, params) => {
  if (params.loggedIn === 'yes') {
    const responseJSON = {
      message: 'access granted',
      id: 'unauthorized',
    };

    respond(request, response, 200, responseJSON);
  } else {
    const responseJSON = {
      message: 'page not found',
      id: 'unauthorized',
    };
    respond(request, response, 401, responseJSON);
  }
};

const badRequest = (request, response, type, params) => {
  if (!params.valid || params.valid !== true) {
    // reponseJSON.message = 'BadRequest/404';
  } else {
    // reponseJSON.message = '200';
  }
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: '403 Forbidden',
    id: 'forbidden',
  };
  respond(request, response, 403, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'page not found',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON);
};

// export all responses
module.exports = {
  success, badRequest, notFound, forbidden, unauthorized,
};
