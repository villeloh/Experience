'use strict';


if (document.cookie.length === 0) {
    window.location.href = "LogInPage.html";
}

getUserStats();

const addPhotoButton = document.querySelector('#add-photo');
const profileImg = document.querySelector('#profile-img');
const userNameDisplay = document.querySelector('#username-display');

getUserStats(userNameDisplay, profileImg);

addPhotoButton.onchange = uploadOnChange;

function uploadOnChange() {
    
    const imageData = new FormData();

    imageData.append('imgFile', addPhotoButton.files[0]);
    console.log("imageData: " + imageData);
    
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
        
        updatePic(myJson.src);
        
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch(); 
}


//const pepeProfileImg = document.getElementById("profile-img");
//const pepeSquareImg = document.getElementById("pepe");
const userNameInput = document.getElementById("username-input");
//const removeButton = document.getElementById("remove-photo");
//const addButton = document.getElementById("add-photo");
const saveButton = document.getElementById("save-settings");
const settingsForm = document.querySelector("#settingsForm");

/*
removeButton.addEventListener('click', () => {
    pepeProfileImg.src = "resources/default.jpg";
    console.log(pepeProfileImg.src);
    pepeSquareImg.src = "resources/default.jpg";
});

addButton.addEventListener('click', () => {
    pepeProfileImg.src = "resources/pepe.png";
    pepeSquareImg.src = "resources/pepe.png";
});

*/

saveButton.addEventListener('click', () => {
    if (userNameInput.value.length < 20 && userNameInput.value != "") {
    const name = userNameInput.value;
    userNameDisplay.innerText = name;
    userNameInput.value = "";
    } else {
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    }
});

settingsForm.addEventListener("submit", function(evt) {
        evt.preventDefault();
        alterUserStats();
});

function updatePic(src) {
    
    const request = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `pic=${src}`
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
    
    fetch('App/ProfileService/AlterUserStats', request).then((response) => {
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
    
} // end alterUserStats()









