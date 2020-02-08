const respond = (request, response, status, data, type) => {
    //differentiate between types
    if(type === 'text/xml'){
        data = `<response><message>${data.message}</message><id>${data.id}</id></response>`;
    }else {
        data = JSON.stringify(data);
    }
    
  response.writeHead(status, { 'Content-Type': type });
  response.write(data);
  response.end();
};

// want different interactions for different responses/server reactions
const success = (request, response, type) => {
  const responseJSON = {
    message: 'Successful Message',
  };

  return respond(request, response, 200, responseJSON, type);
};

const unauthorized = (request, response, type, params) => {
    let responseJSON = {};
  if (params.loggedIn === 'yes') {
    responseJSON = {
      message: 'Access Granted',
      id: 'unauthorized',
    };
    respond(request, response, 200, responseJSON, type);

  } else {
    responseJSON = {
      message: 'Page not found ',
      id: 'unauthorized',
    };
    respond(request, response, 401, responseJSON, type);
  }
};

const badRequest = (request, response, type, params) => {
    let responseJSON = {};
  if (!params || !params.valid || params.valid !== true) {
      responseJSON = {
          message: 'Bad Request',
          id: 'badRequest'
      };
  } else {
    responseJSON = {
        message: 'Success',
        id: 'badRequest'
    };
  }
  respond(request, response, 400, responseJSON, type);
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'Forbidden',
    id: 'forbidden',
  };
  respond(request, response, 403, responseJSON, type);
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'Page not found',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON, type);
};

const internal = (request, response, type) => {
    const responseJSON = {
      message: 'Internal server error, something went wrong',
      id: 'internal',
    };
  
    respond(request, response, 500, responseJSON, type);
  };

const notImplemented = (request, response, type) => {
    const responseJSON = {
      message: 'This has not been implemented yet, check back soon for updates',
      id: 'notImplemented',
    };
  
    respond(request, response, 501, responseJSON, type);
  };

// export all responses
module.exports = {
  success, badRequest, notFound, forbidden, unauthorized, internal, notImplemented,
};
