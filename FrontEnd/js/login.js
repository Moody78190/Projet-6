import { getUsers } from '../components/api.js';

// Form creation
const form = document.createElement('form');
form.setAttribute('id', 'formContainer');

// Creating form fields
const emailLabel = document.createElement('label');
emailLabel.setAttribute('for', 'email');
emailLabel.textContent = 'Email:';
const emailInput = document.createElement('input');
emailInput.setAttribute('type', 'text');
emailInput.setAttribute('id', 'email');
emailInput.setAttribute('name', 'email');

const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'Password:';
const passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'password');
passwordInput.setAttribute('name', 'password');



// Submit button
const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'Submit');
submitButton.setAttribute('id', 'submit-Button');
submitButton.textContent = 'Log In';
//Forgotten Password

const passwordButton = document.createElement('button');
passwordButton.setAttribute('type', 'submit');
passwordButton.setAttribute('value', 'Submit');
passwordButton.setAttribute('id', 'password-Button');
passwordButton.textContent = 'Log In';        
// Adding fields to the form
form.appendChild(emailLabel);
form.appendChild(emailInput);
form.appendChild(passwordLabel);
form.appendChild(passwordInput);
form.appendChild(submitButton);

// Adding the form to the document
document.body.appendChild(form);

// Function to send form data
const sendData = (formDataObject, token) => {
    return new Promise((resolve, reject) => {
        // Ensure token is available before making the request
        if (!token) {
            reject('Token is not available.');
            return;
        }

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formDataObject),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {
                console.log('Data sent successfully:', responseData);
                resolve(responseData);
            })
            .catch((error) => {
                console.error('There was a problem with the form submission:', error);
                reject(error);
            });
    });
};

// Function to handle form submission
const handleSubmit = (formDataObject) => {
    fetchToken()
        .then(token => {
            sendData(formDataObject, token);
        })
        .catch(error => {
            console.error('Error retrieving token:', error);
        });
};

// Event listener to submit the form
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form behavior (page reload)

    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Call the form submission handling function with the form data
    handleSubmit(formDataObject);
});

// Function to fetch token
function fetchToken() {
    return new Promise((resolve, reject) => {
        const apiUrl = 'http://localhost:5678/api/users/login';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": "string",
                "password": "string"
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(`Error during request: ${response.statusText}`);
                }
            })
            .then(token => {
                resolve(token);
            })
            .catch(error => {
                reject(`Error during request: ${error.message}`);
            });
    });
}
getUsers().then((data) => formDataObject(data));