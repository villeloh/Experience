'use strict';


/*
* Javascript for all the log in page stuff
* @author Ville L, Mikael R
*/

if (loggedIn()) {

    window.location.href = "index.html";
}

const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');
const loginAliasInput = document.querySelector('#loginName');
const loginPwInput = document.querySelector('#loginPw');

const signupAliasInput = signUpForm.elements[0];
const signupEmailInput = signUpForm.elements[1];
const signupPwInput = signUpForm.elements[2];
const signupPw2Input = signUpForm.elements[3];

const SPECIALS = "\\!\\$\\&\\%\\+\\#\\\\\{\\}\\@\\/\\[\\]\\*\\;\\^\\'\\~\\<\\>\\|\\=\\`\\(\\)\\\"";
/*---------------CLIENT SIDE VALIDATION---------------- */

const buttonSubmit = document.getElementById('submit-values');

buttonSubmit.addEventListener('click', () => {
    
    const signUpForm = document.querySelector('#signUpForm');
    const signupAliasInput = signUpForm.elements[0].value;
    const signupEmailInput = signUpForm.elements[1].value;
    const signupPwInput = signUpForm.elements[2].value;
    const signupPw2Input = signUpForm.elements[3].value;
   
    if (validUser(signupAliasInput, signupEmailInput, signupPwInput, signupPw2Input)) {
       
        signup();
    } else {
       
       // TODO: display a msg about invalid input
    }
}); // end buttonSubmit.addEventListener()

loginForm.addEventListener("submit", function(evt) {

    evt.preventDefault();

    const loginAliasInput = loginForm.elements[0].value;
    const loginPwInput = loginForm.elements[1].value;

    // if we use some dummy values, the same validation function can be used as for signup()
    if (validUser(loginAliasInput, "dummy@foo.com", loginPwInput, loginPwInput)) {
        
        login();    
    } else {
        
        // TODO: display a msg about invalid input
    }
}); // end loginForm.addEventListener()

function login() {

    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        credentials: 'same-origin',
        body: `loginUsername=${loginAliasInput.value}&loginPassword=${loginPwInput.value}`
    };
    
    fetch('App/LoginService/LogIn', request).then((response) => {   
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
        
    }).then((myJson) => {

        if (myJson.status === 'loggedIn') {
            
            document.cookie = "id=" + myJson.id; // store the user's id in a global cookie for the duration of the session
            window.location.href = "index.html";
            
        }
        else if (myJson.status === 'wrongUsername') {
            
            // TODO: display a msg about wrong username
        } 
        else if (myJson.status === 'wrongPw') {
            
            // TODO: display a msg about wrong password
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
}); // end fetch()
} // end login()

function signup() {
    
    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        credentials: 'same-origin',
        body: `username=${signupAliasInput.value}&email=${signupEmailInput.value}&password=${signupPwInput.value}&password2=${signupPw2Input.value}`
    };
    
    fetch('App/LoginService/SignUp', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
        
    }).then((myJson) => {

        if (myJson.status === 'loggedIn') {
            
            document.cookie = "id=" + myJson.id; 
            window.location.href = "index.html";
            
            // TODO: display a msg about successfully signing up
        }
        else if (myJson.status === 'usernameTaken') {
            
            // TODO: display a msg about taken username
        } else if (myJson.status === 'emailTaken') {
            
            // TODO: display a msg about taken email
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end signup()
