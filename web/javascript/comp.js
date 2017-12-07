'use strict';

const leftForm = document.querySelector('#upload-left');
const rightForm = document.querySelector('#upload-right');
/*
rightForm.addEventListener("submit", function(evt) {
        event.preventDefault();
        addComp();
});
 */
function addComp() {
    
    const title = leftForm.elements[0].value;
    const author = leftForm.elements[1].value;
    const length = leftForm.elements[2].value;
    const pages = leftForm.elements[3].value;
    const year = rightForm.elements[0] .value;
    const diff = rightForm.elements[1].value;
    const video = rightForm.elements[2].value;
    const sheet = rightForm.elements[3].value;

    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie}, // not sure if this is how this works...
        method: 'POST',
        credentials: 'same-origin',
        body: `title=${title}&author=${author}&length=${length}&pages=${pages}&year=${year}&diff=${diff}&video=${video}&sheet=${sheet}`
        // NOTE: could be done with a FormData object instead in a much easier way..?
    };
    
    fetch('App/CompService/AddComp', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');  
        
    }).then((myJson) => {

        if (myJson.status === 'addedComp') {
            
            // TODO: display a msg about successfully adding a composition
            // TODO: I'm not sure which screen should open afterwards... If we want to 'go to' the composition (detailed view),
            // then we need to return more info from the method (addComp() in CompService.java)
        } else {
            
            // TODO: display a msg about failing to add the composition
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
}); // end fetch()
} // end addComp()
