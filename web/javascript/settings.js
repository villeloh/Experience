'use strict';

/*
 * Script for altering user settings (profile photo, email, etc).
 * Used in settings.html.
 * @author Ville L, Mikael R
 */

if (!loggedIn()) {
    
    window.location.href = "LogInPage.html";
}

const addPhotoButton = document.querySelector('#add-photo');
const deletePhotoBtn = document.querySelector("#remove-photo");
const profileImg = document.querySelector('#profile-img');
const userNameDisplay = document.querySelector('#username-display');
const userNameInput = document.getElementById("username-input");
const saveButton = document.getElementById("save-settings");
const settingsForm = document.querySelector("#settingsForm");

// populate the relevant elements with the logged-in user's stats
getUserStats(userNameDisplay, profileImg);

addPhotoButton.onchange = () => {
    
    uploadPic();
};

deletePhotoBtn.onclick = () => {
    
    deletePic();
};

saveButton.addEventListener('click', () => {
    
    if (userNameInput.value.length < 20 && userNameInput.value !== "") {

        alterUserStats();        
    } 
    else {       
        const popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }
}); // end saveButton.addEventListener()

/*
settingsForm.addEventListener("submit", function(evt) {
    
        evt.preventDefault();
        alterUserStats();
});
*/

function uploadPic() {
    
    const imageData = new FormData();

    imageData.append('imgFile', addPhotoButton.files[0]);
    
    const request = {
        method: 'POST',
        credentials: 'same-origin',
        body: imageData
    };

    fetch('http://10.114.32.22:8080/Experience3/ImageUploadServlet', request).then((response) => {
        
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {
        
        // when we've uploaded a new profile photo, immediately put it in the user profile
        updatePic(myJson.src);
        
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch(); 
} // end uploadPic()

function updatePic(picUrl) {
    
    const request = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `pic=${picUrl}`
    };

    fetch('http://10.114.32.22:8080/Experience3/App/ProfileService/UpdatePic', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {
        
        if (myJson.status === "updatedPic") {
            
            profileImg.src = myJson.pic;
        } else {
            console.log("Something went wrong...");
        }
        
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch();  
} // end updatePic()

function deletePic() {
    
    const request = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin'
    };

    fetch('http://10.114.32.22:8080/Experience3/App/ProfileService/DeletePic', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {
        
        if (myJson.status === "deletedPic") {
            
            profileImg.src = myJson.pic;
            console.log("image location: " + profileImg.src);
        } else {
            console.log("Something went wrong...");
        }
        
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch();   
} // end deletePic()

function alterUserStats() {
    
    const email = settingsForm.elements[0].value;
    const alias = settingsForm.elements[1].value;
    const pw = settingsForm.elements[2].value;
    const pw2 = settingsForm.elements[3].value;

    const request = { 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
    'Cookie': document.cookie}, // not sure if this is how this works...
    method: 'POST',
    credentials: 'same-origin',
    body: `newEmail=${email}&newAlias=${alias}&newPw=${pw}&newPw2=${pw2}`
    // NOTE: could be done with a FormData object instead in a much easier way..?
    };
    
    fetch('App/ProfileService/AlterOwnUserStats', request).then((response) => {
    if(response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');  
        
    }).then((myJson) => {

        if (myJson.status === 'alteredOwnUserStats') {
            
            if (myJson.alias !== "noChange" || myJson.email !== "noChange") {
                
                // we don't really need to fetch the img, but meh, whatever
                getUserStats(userNameDisplay, profileImg);
            }
            
            // TODO: display a popup msg about all the altered stats
            
        } else {
            
            // TODO: display a msg about failing to alter the stats
        }
    }).catch(function(error) {
        
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()    
} // end alterUserStats()









