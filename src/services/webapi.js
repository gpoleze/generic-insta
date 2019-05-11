// const API = 'https://instalura-api.herokuapp.com/api';
const API = 'http://localhost:8080/api';

const handleError = res => {
    if (res.ok)
        return res;

    throw new Error(res.statusText);
};

export function get(service) {
    const url = API + service;

    return fetch(url)
        .then(handleError)
        .then(res => res.json());
}

export function post(service, data) {
    const requestInfo = {
        method: 'POST',
        mode: "cors",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type': 'application/json'
        })
    };

    return fetch(API + service, requestInfo)
        .then(handleError);
}


