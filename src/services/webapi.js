const API = 'https://instalura-api.herokuapp.com/api';

export function get(service) {
    const url = API + service;

    return fetch(url)
        .then(res => {
            if (res.ok)
                return res;

            throw new Error(res.statusText);
        })
        .then(res => res.json());
}


