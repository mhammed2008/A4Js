import * as user from "./main.js";
if (user.islogin()) {
    user.redirect("/")
}
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let emailError = document.querySelector("#emailError");
let pasError = document.querySelector("#pasError");

let loginBtn = document.querySelector('#login');

loginBtn.addEventListener("click", () => {
    let errors = user.login({
        email: email.value,
        password: password.value,
    });
    if (errors) {
        errors.email ? (emailError.innerHTML = errors.email, email.classList.add('is-invalid')) : (emailError.innerHTML = '', email.classList.replace('is-invalid', 'is-valid'));
        errors.password ? (pasError.innerHTML = errors.password, password.classList.add('is-invalid')) : (pasError.innerHTML = '', password.classList.replace('is-invalid', 'is-valid'));
    }
    // console.log("dsf");
})

email.addEventListener("keyup", () => {
    let errors = user.val({ email: email.value }, ['email'] , false);
    errors.email ? (emailError.innerHTML = errors.email, email.classList.add('is-invalid')) : (emailError.innerHTML = '', email.classList.replace('is-invalid', 'is-valid'));
})

password.addEventListener("keyup", () => {
    let errors = user.val({ password: password.value }, ['password'], false);
    errors.password ? (pasError.innerHTML = errors.password, password.classList.add('is-invalid')) : (pasError.innerHTML = '', password.classList.replace('is-invalid', 'is-valid'));
})