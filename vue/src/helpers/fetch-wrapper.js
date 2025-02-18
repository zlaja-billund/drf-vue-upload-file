import { useAuthStore } from "@/stores"; 

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
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

        if (!response.ok) {
            const { accessKey, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && accessKey) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            //const error = (data && data.message) || response.statusText;

            return Promise.reject(data);
        }

        return data;
    });
}