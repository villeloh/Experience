'use strict';

// used for fetching user stats for profile etc (on page load)
function getUserStats(titleElem, imgElem) {
      
const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `${document.cookie}` // this is highly brittle...
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
            console.log("Failed to fetch user infos!");
            // TODO: display a msg about failing to add the composition
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
}); // end fetch()
} // end getUserStats()












