import { formContainer, email, password } from "./components/domLinker.js";
import { postLogin } from "./components/api.js";

formContainer.addEventListener('submit', e => {
    e.preventDefault()

    postLogin({ email: email.value, password: password.value })
        .then(data => {
            localStorage.token = data.token
            window.location.href = '../index.html'
        }).catch(error => alert(error))
})
