import * as user from "./main.js";
if (user.islogin()) {
    user.redirect("/")
}
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let nameError = document.querySelector("#nameError");
let emailError = document.querySelector("#emailError");
let pasError = document.querySelector("#pasError");

let registerBtn = document.querySelector('#register');

registerBtn.addEventListener("click", () => {
    let errors = user.register({
    name: name.value,
    email: email.value,
    password: password.value
    })
    if (errors) {
        errors.name ? (nameError.innerHTML = errors.name, name.classList.add('is-invalid')) : (nameError.innerHTML = '', name.classList.replace('is-invalid', 'is-valid'));
        errors.email ? (emailError.innerHTML = errors.email, email.classList.add('is-invalid')) : (emailError.innerHTML = '', email.classList.replace('is-invalid', 'is-valid'));
        errors.password ? (pasError.innerHTML = errors.password, password.classList.add('is-invalid')) : (pasError.innerHTML = '', password.classList.replace('is-invalid', 'is-valid'));
    }
})

name.addEventListener("keyup", () => {
    let errors = user.val({ name: name.value }, ['name']);
    errors.name ? (nameError.innerHTML = errors.name, name.classList.add('is-invalid')) : (nameError.innerHTML = '', name.classList.replace('is-invalid' , 'is-valid') );
})

email.addEventListener("keyup", () => {
    let errors = user.val({ email: email.value }, ['email']);
    errors.email ? (emailError.innerHTML = errors.email, email.classList.add('is-invalid')) : (emailError.innerHTML = '', email.classList.replace('is-invalid' , 'is-valid') );
})

password.addEventListener("keyup", () => {
    let errors = user.val({ password: password.value }, ['password']);
    errors.password ? (pasError.innerHTML = errors.password, password.classList.add('is-invalid')) : (pasError.innerHTML = '', password.classList.replace('is-invalid' , 'is-valid') );
})