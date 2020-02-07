const respond = (request, response, status, data, type) => {
    response.writeHead(status, { 'Content-Type': type});
    response.write(data);
    response.end();
}

//want different interactions for different responses/server reactions
const success = (request, response, type) => {
    if(type === 'text/html'){
        let responseXML = '<response><message>Successful Message</message></response>';
        return response(request, response, 200, responseXML, 'text/xml');
    }

    //send back the json
    const responseJSON = {
        message: "Successful Message",
    };

    let JSONString = JSON.stringify(responseJSON);

    return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, params) => {
    if(params.loggedin === 'yes'){
        responseJSON = {
            message: 'access granted',
            id: 'unauthorized'
        }

        respondJSON(request, response, 200, responseJSON);
    }else{
        const responseJSON ={
            message: 'page not found',
            id: 'unauthorized'
        };
        respondJSON(request, response, 401, responseJSON);
    }
};

const badRequest = (request, response, type, params) => {
    if(!params.valid || params.valid !== true){
        reponseJSON.message = 'BadRequest/404';
    }else{
        reponseJSON.message = '200';
    }
};

const forbidden = (request, response) => {
    const responseJSON = {
        message: '403 Forbidden',
        id: 'forbidden'
    };
    respondJSON(request, response, 403, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'page not found',
        id: 'notFound'
    };

    respondJSON(request, response, 404, responseJSON);
};

//export all responses
module.exports = {
    success, badRequest, notFound,
}