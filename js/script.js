import { User } from "./classes.js";

const loginForm = document.querySelector("login-form");
const registerForm = document.querySelector("register-form");

function getFormValues(formObj)
{
    const data = new FormData(formObj);
    const formValuesObj = Object.fromEntries(data.entries());
    return formValuesObj;
}

function frontValidate(formObj)
{
    let isValid = true;

    const name = formObj.elements['name'];
    const email = formObj.elements['email'];
    const password = formObj.elements['password'];
    const passwordConfirm = formObj.elements['password-confirm'];

    return isValid;
}

function backValidate(formObj)
{
    let isValid = true;

    //Get user from local storage where email = email
        //if exists
            //check password = password
                //if correct 
                    //forward to nextpage
                //else
                    //show 'no users match the input data'

    return isValid;
}

function login(event)
{
    event.preventDefault();
    //if backValidate()
        //forward to homepage
    //else
        //show error message
}

function register(event)
{
    event.preventDefault();
    //if (validate(event.target))
        //let obj = getFormData(target)
            //if !checkExistnce()
                //store obj in local storage under Users
                //store obj email under Emails (for existence check)
}

loginForm.addEventListener('submit', getFormValues);
registerForm.addEventListener('submit', getFormValues);
