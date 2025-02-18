
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
           
        };
        
        if (body) {
            //requestOptions.headers['Content-Type'] = 'multipart/form-data';
            requestOptions.body = body;
        }
        
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
    });
}