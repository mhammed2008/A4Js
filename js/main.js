
let users ;
if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
} else {
    users = [];
}

function redirect(path) {

    if (window.location.pathname !== path) {
        window.location.pathname = `/A4Js/${path}`;
    } else {
        return false;
    }
}

function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users))
}

function register(user = {}) {
    if (val(user, ['name', 'email', 'password']) == true) {
        users.push({
            name: user.name,
            email: user.email,
            password: user.password
        });
        saveToLocalStorage()
        redirect("/pages/login.html");
    } else {
        return val(user, ['name', 'email', 'password']);
        
    }
}

function islogin() {
    return localStorage.getItem("islogin")? true :false;
}
function auth() {
    let auth = JSON.parse(localStorage.getItem("islogin"));
    return auth;
}

function login(user = {}) {
    if (val(user, ['email', 'password'], false)== true  ) {
        let email = users.find(function(l) { return l.email === user.email }) ? true : false;
        let pas = users.find(function(l){ return l.password === user.password }) ? true : false;
        
        if (email & pas) {
            localStorage.setItem("islogin", JSON.stringify(users.find(function (l) { return l.email === user.email })))
            redirect('/')
        } else if (!pas) {
            return { password: "wrong password"}
        }
        
    } else {
        return val(user, ['email', 'password'] , false);
        
    }
}
function logout() {
    localStorage.removeItem("islogin");
    redirect("/pages/login.html")
}

function val(inputs = {}, valKeys = [], register = true) {
    let errors = {};
    let success = true;
    let valname = /^[A-Za-z0-9]{3,}/;
    let valemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let valpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let name = valKeys.find((i) => i == "name");
    let email = valKeys.find((i) => i == "email");
    let password = valKeys.find((i) => i == "password");

    if (name) {
        if (!valname.test(inputs.name)) {
            success = false;
            Object.defineProperty(errors, "name", { value: "The name should be 3 characters or more and don't use special characters" });
        }
        
    }
    if (email) {

         if (!valemail.test(inputs.email)) {
            success = false;
             Object.defineProperty(errors, "email", { value: "Invaild email address" });
        }
        else if (users.find((user) => user.email == inputs.email) && register == true) {
            success = false;
            
            Object.defineProperty(errors, "email", { value: "This email is already in use. Log in or use a different email." })
        } else if (!users.find((user) => user.email == inputs.email )&& register == false) {
            success = false;
            Object.defineProperty(errors, "email", { value: "this email dosn`t exsite please sing Up" });
        }
       
         
        
    }
    if (password) {
        if (!valpassword.test(inputs.password)) {
            success = false;
            Object.defineProperty(errors, "password", { value: "Password must be 8 or more characters long and use uppercase letters and numbers." });
        }
    }
    if (success) {
        return true
    } else {
        return errors;
    }
}

export {
    users,
    redirect,
    saveToLocalStorage,
    register,
    val,
    login,
    islogin,
    auth,
    logout
}
