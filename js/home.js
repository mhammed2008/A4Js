import * as user from './main.js';

if (!user.islogin()) {
    user.redirect("./pages/login.html")
}

let showName = document.getElementById("showName")
let showEmail = document.getElementById("showEmail")
// let Update = document.querySelector("#Update")
let Logout = document.querySelector("#Logout")

let auth = user.auth();

showName.innerHTML = "Hello "+ auth.name;

showEmail.innerHTML = auth.email;

console.log(user.islogin());

Logout.addEventListener("click", () => {
    if (confirm('Are You sur you went to logout')) {
        user.logout()
    }
})
