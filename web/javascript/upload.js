'use strict';


/*
* Javascript for upload composition page
* @author Mikael R, Ville L
*/

const submitButton = document.getElementById("submitBtn");

if (!loggedIn()) {

    window.location.href = "LogInPage.html";
}

let title;
let author;
let length;
let year;
let pages;
let diff;
let video;
let sheet;

/* ---------------GETTING SHEET NAME ---------------*/

document.getElementById('sheet-upload').onchange = uploadOnChange;

function uploadOnChange() {
    var filename = this.value;
    var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0) {
        filename = filename.substring(lastIndex + 1);
    }
    document.getElementById('sheet-form').value = filename;
}

/* ----- Page options -------*/
  for (var i = 1; i <= 10; i++) {
        if (i === 1){
        const name = i + " page";
        const sel = document.getElementById("list-20");
        sel.options[sel.options.length] = new Option(name,i);
        } else {
       const name = i + " pages";
        const sel = document.getElementById("list-20");
        sel.options[sel.options.length] = new Option(name,i);
        }
}

const newComposition = document.getElementsByClassName("inputfield");

/* ------- VALIDATION ---------*/


const number = document.getElementById('number');
const number1 = document.getElementById('number-1');

number.onkeypress = number.onpaste = checkInput;
number1.onkeypress = number.onpaste = checkInput;

function checkInput (e) {
        var e = e || event;
        var char = e.type === 'keypress'
            ? String.fromCharCode(e.keyCode || e.which)
            : (e.clipboardData || window.clipboardData).getData('Text');
        if (/[^\d]/gi.test(char)) {
            return false;
        }
}

submitButton.addEventListener('click', function(evt) {
    
    evt.preventDefault();

    title = newComposition[0].value;
    author = newComposition[1].value;
    length = newComposition[2].value;
    year = newComposition[3].value;
    pages = newComposition[4].options[newComposition[4].selectedIndex].value;
    diff = newComposition[5].options[newComposition[5].selectedIndex].value;
    video = newComposition[6].value;
    sheet = newComposition[7].value;

    if (validFields()) {
        
        addFile();
    }
});

const validFields = () => {

    const patternName = new RegExp("^[a-zA-Z0-9]+$");
    const patternYoutubeURL = new RegExp("^https\\:\\/\\/www\\.youtube\\.com\\/\\S+$");
    const testTitle = patternName.test(title);
    const testAuthor = patternName.test(author);
    const testYoutubeURL = patternYoutubeURL.test(video);

    if (testTitle && testAuthor && testYoutubeURL && length <= 600 && year <= 2020 && year >= 1500 && pages > 0 && diff !== 'null') {
        return true;
    } else {
        return false;
    }
}; // end validFields()

// there might be a better way to do this, but we're running out of time... we'll just use a WebServlet for
// uploading the file itself
function addFile() {

    const fileField = document.querySelector('#sheet-upload');
    const imageData = new FormData();

    imageData.append('imgFile', fileField.files[0]);
    
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
        
        sheet = myJson.src; // it's already been validated at this point... fix asap!
        addComp(); // a bit awkward, but it works...
        
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch(); 
} // end addFile()

function addComp() {
    
    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
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

            window.location.href = "upload.html"; // refresh the page to give feedback and clear the form fields
        } else {
            console.log("Failed to add a new composition!");
            // TODO: display a msg about failing to add the composition
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
}); // end fetch()
} // end addComp()
