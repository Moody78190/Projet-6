/* eslint-disable linebreak-style */
const URL_WORKS = 'http://localhost:5678/api/works';
const URL_CATEGORIES = 'http://localhost:5678/api/categories';
const URL_LOGIN = 'http://localhost:5678/api/users/login';


export const getWorks = () => fetch(URL_WORKS).then((res) => res.json());
export const getCategories = () => fetch(URL_CATEGORIES).then((res) => res.json());


//Authentification //
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
//Delete request//

export const deleteWorks = worksId =>
    fetch(`http://localhost:5678/api/works/${worksId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    })

//POST REQUEST//

export const addWork = (image, title, category) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);

    return fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    });
}

   

