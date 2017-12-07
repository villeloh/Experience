'use strict';

// Js file containing utility methods that are to be used on most pages.
// Author: Ville L.

// if no id is found stored in the cookie, load the specified page
const noCookieIdLoadPage = (page) => {
    
    const cookies = readCookies();
    
    if (!cookies.includes("id=")) {
        window.location.href = page;
    }
};

// used for fetching user stats on page load (for profile etc)
const getUserStats = (titleElem, imgElem) => {
      
const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `${document.cookie}` // NOTE: this is highly brittle..! fix asap!
        // NOTE: could be done with a FormData object instead in a much easier way..?
    };

fetch('App/ProfileService/GetUserStats', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

        if (myJson.status === 'gotUserStats') {

            titleElem.innerHTML = myJson.alias;
            imgElem.src = myJson.pic;   
        } else {

            console.log("myJson.status: " + myJson.status);
            console.log("Failed to fetch user stats!");
            // TODO: display a msg about failing to load the stats
        }
    }).catch(function(error) {
        
        console.log('There has been a problem with your fetch operation: ' + error.message);
}); // end fetch()
}; // end getUserStats()

// parse the cookies and extract the user id (if present)
// NOTE: if I change this to const, I cannot do this: 'let c = readCookies'; it complains about it already having been defined -.-
function readCookies() {
    
    let cookies = document.cookie;
    let key;
    let value;

    // Get all the cookies pairs in an array
    const cookieArr  = cookies.split(';');

    // Now take key-value pair out of this array
    for(let i=0; i<cookieArr.length; i++){
       key = cookieArr[i].split('=')[0];
       value = cookieArr[i].split('=')[1];

       if (key === "id") {
           return key + "=" + value;
       }   
    }
    return "noIdFound";
} // end readCookies()

// xxxxxxxxxxxxxxxxxxxx VALIDATION xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function validUser(alias, email, pw, pw2) {
    
    const SPECIALS = "\\!\\$\\&\\%\\+\\# \\\ \\{\\}\\@\\/\\[\\]\\*\\;\\^\\'\\~\\<\\>\\|\\=\\`\\(\\)\\\""; // the end has 1 extra slash, but it won't accept it with just 2...
    
    const patternUsername = new RegExp("^[a-zA-Z0-9]+$");
    const patternEmail = new RegExp("^[^"+SPECIALS+"\\d\\s+][a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,3}$");
    const patternPassword = new RegExp("^(?=.*["+SPECIALS+"]{2,})(?!.*\\s+)(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\\d{2,}).*$");
    const testUser = patternUsername.test(alias);
    const testEmail = patternEmail.test(email);
    const testPw = patternPassword.test(pw);

    return testUser && testEmail && testEmail && testPw && (pw === pw2); 
} // end validUser()
