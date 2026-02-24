import { User } from "./classes.js";

(function loadData() //used when loading body
{
    //TODO: fetch products from database
    if(localStorage.getItem("emails") == null)
    {
        localStorage.setItem("emails", JSON.stringify([]));
    }
    if(localStorage.getItem("users") == null)
    {
        localStorage.setItem("users", JSON.stringify([]));
    }
}
)();

function validateFieldByPattern(formField, pattern, errorMessage)
{
    let fieldValid = true;
    let elemSpan = formField.nextElementSibling;
    if(!formField.value.match(pattern))
    {
        elemSpan.setAttribute("class", "validate-invalid");
        elemSpan.textContent = errorMessage;
        fieldValid = false;
    }
    else
    {
        elemSpan.setAttribute("class", "validate-valid");
        elemSpan.textContent = "";
        fieldValid = true;
    }
    return fieldValid;
}

function registerValidate()
{
    let isValid = true;

    const name = document.getElementById("register-name");
    const namePattern = /[a-zA-Z\s]/;
    const nameErrorMsg = "Name must be alphabetical characters only";
    let nameValid = validateFieldByPattern(name, namePattern, nameErrorMsg);

    const email = document.getElementById("register-email");
    const emailPattern = /\w{3,}@(yahoo|gmail|outlook).com/;
    const emailErrorMsg = "Email must be yahoo, gmail, or outlook";
    let emailValid = validateFieldByPattern(email, emailPattern, emailErrorMsg);

    const password = document.getElementById("register-password");
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/;
    const passwordErrorMsg = "Password must contain capital, small letters and numbers";
    let passwordValid = validateFieldByPattern(password, passwordPattern, passwordErrorMsg);

    const passwordConfirm = document.getElementById("register-password-confirm");
    const passwordConfirmErrorMsg = "Passwords don't match";
    let passwordConfirmValid = (password.value == passwordConfirm.value);
    let confirmSpan = passwordConfirm.nextElementSibling;

    if(!passwordConfirmValid)
    {
        confirmSpan.setAttribute("class", "validate-invalid");
        confirmSpan.textContent = passwordConfirmErrorMsg;
    }
    else
    {
        confirmSpan.setAttribute("class", "validate-valid");
        confirmSpan.textContent = "";
    }

    if(!(nameValid && emailValid && passwordValid && passwordConfirmValid))
    {
        isValid = false;
    }

    return isValid;
}

function checkUserExistence(email)
{
    let userExists = false;
    let emails = JSON.parse(localStorage.getItem("emails"));
    for(let i of emails)
    {
        if(i == email)
        {
            userExists = true;
        }
    }
    return userExists;
}

function registerUser(event)
{
    event.preventDefault();
    if (!registerValidate()) return;

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    let user = new User(name, email, password);

    if (!checkUserExistence(user.email))
    {
        let users = JSON.parse(localStorage.getItem("users"));
        let emails = JSON.parse(localStorage.getItem("emails"));

        users.push(user);
        emails.push(user.email);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("emails", JSON.stringify(emails));
        
        showAlert("User registered successfully", "alertBox", redirectToIndex);
    }
    else
    {
        showAlert("User Already Exists!", "alertBox", ()=>{});
    }
    
}

window.registerUser = registerUser;
window.loginUser = loginUser;

function loginUser(event)
{
    event.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let loginValid = false;

    let users = JSON.parse(localStorage.getItem("users"));
    for (const element of users) 
    {
        if(element["email"] == email && element["password"] == password)
        {
            loginValid = true;
        }
    }

    if(loginValid)
    {
        showAlert("Login success", "alertBox", () => {})
    }
    else
    {
        showAlert("Incorrect email or password", "alertBox", () => {})
    }
}

function showAlert(message, alertBoxId, callback, imgSrc) {
  let alertBox = document.getElementById(alertBoxId);
  let alertMsg = document.createElement("div");
  let closeBtn = document.createElement("button");

  alertBox.replaceChildren();
  alertMsg.textContent = message;
  closeBtn.textContent = "OK";
  closeBtn.onclick = () => closeAlert("alertBox", callback);

  alertBox.appendChild(alertMsg);
  alertBox.appendChild(closeBtn);
  alertBox.style.display = "block";

}

function redirectToIndex()
{
    location.href = "./index.html";
}

function closeAlert(alertBoxId, callback) { //will be called by button OK
  document.getElementById(alertBoxId).style.display = "none";
  callback();
}
