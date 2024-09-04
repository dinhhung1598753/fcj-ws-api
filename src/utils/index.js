export const getUsername = (authorizer) => {
    return authorizer?.jwt?.claims?.username
}

export const generateResponse = (statusCode, data, message)=> {
    if(statusCode === 200 || statusCode === 201) {
        return {
            statusCode,
            headers: {
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
              message: message ?? RESPONSE_MESSAGE[statusCode],
              data
            }),
          };
    } else {
        return {
            statusCode,
            headers: {
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify({
              message: RESPONSE_MESSAGE[statusCode]
            }),
        }
    }
}

const RESPONSE_MESSAGE = {
    200: "Success",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
}
