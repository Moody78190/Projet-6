/* eslint-disable linebreak-style */
const URL_WORKS = 'http://localhost:5678/api/works';
const URL_CATEGORIES = 'http://localhost:5678/api/categories';
const URL_LOGIN = 'http://localhost:5678/api/users/login';

export const getWorks = () => fetch(URL_WORKS).then((res) => res.json());

export const getCategories = () => fetch(URL_CATEGORIES).then((res) => res.json());

export const postLogin = data => fetch(URL_LOGIN, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then(res => {
    if (res.status !== 200) {
        throw "Erreur dans l’identifiant ou le mot de passe"
    }
    return res.json()
});
