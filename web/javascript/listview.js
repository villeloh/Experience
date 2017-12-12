'use strict';

/*
 * Script that loads the main list view of compositions (when you click on Beginner, Intermediate or Advanced in the left-side menu).
 * Used in Beginner.html, Intermediate.html and Advanced.html
 * @author Ville L, Mikael R
 */

const mainElement = document.getElementById('write-here');
const imageWrapper = document.getElementById('image-wrapper');
const beginnerButton = document.querySelector('#beginnerBtn');
const intermediateButton = document.querySelector('#intermediateBtn');
const advancedButton = document.querySelector('#advancedBtn');

// NOTE: it's crude and brittle, but we're running out of time to do sophisticated solutions
const cPage = currentPage(); // function is in info.js
let diff;
let ownButton;

if (cPage === 'Beginner.html') { 
    diff = 0;
    ownButton = document.querySelector('#beginnerBtn');
} else if (cPage === 'Intermediate.html') {
    diff = 1;
    ownButton = document.querySelector('#intermediateBtn');
} else if (cPage === 'Advanced.html') {
    diff = 2;
    ownButton = document.querySelector('#advancedBtn');
}

// populate the window with the compositions that have been stored in the database.
// takes the difficulty and the element under which to attach the compositions as arguments.
// NOTE: this also adds the event listeners (so that when you click on a composition, you move to the detailed view)
addCompsToMainView(diff, imageWrapper);

// for refreshing the page (in case someone else has added new compositions)
ownButton.addEventListener('click', () => {
    
    window.location.href = cPage;
});

// ---------------------------------------------------------------------------------------------------------

// populates the main list view with compositions from the db
function addCompsToMainView(diff, element) {
    
    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `diff=${diff}`
    };
    
    fetch('App/CompService/GetCompsByDiff', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

        if (myJson.comp_1 !== null && myJson.comp_1 !== undefined) {

            const jsonLength = Object.keys(myJson).length;
            
            for (let i = 1; i < jsonLength; i++) {
                  
                // this weird operation is needed due to the format of the json that comes from the server... 
                // Consulting the CompService.java and ResponseString.java classes should clarify this
                let actualCompX = Object.values(myJson)[i]; // String
                const replacedHipsut = actualCompX.replace(/'/g, "\""); // the ' had to be used in order to parse the json on the server-side... now that they've served their purpose, we must get rid of them
                const jsonFinal = JSON.parse(replacedHipsut);
                
                element.innerHTML += 
                        
                    `<main class="composition">
                            <div id="hiddenIdDiv">${jsonFinal.id}</div>
                            <div class="composition-title-level-1">${jsonFinal.title}<br>${jsonFinal.author}</div>
                            <div class ="composition-image"><img src="resources/play-button.PNG"></div>
                            <div class ="composition-stats">
                                <div class="stat-img"><img src="resources/thumb-white.png"></div>
                                <div class="stat-text"><p id="like-count">${jsonFinal.likenum}</p> </div>
                                <div class="stat-img"><img src="resources/favorite-white.png"> </div>
                                <div class="stat-text"><p id="favorite-count">${jsonFinal.favnum}</p> </div>
                                <div class="stat-img"><img src="resources/comment.png"></div>
                                <div class="stat-text"><p id="comment-count">${jsonFinal.comms}</p></div>   
                            </div>
                        </main>`;
            } // end for-loop  
            
            const images = document.getElementsByClassName('composition-image');         
            const compIdDivs = document.querySelectorAll('.composition #hiddenIdDiv');
            
            for (let i = 0; i < images.length; i++) {
                
                images[i].addEventListener('click', () => {

                    loadPlayView(compIdDivs[i].innerText, mainElement, cPage);  // move into the larger, more detailed comp view
                });
            }   
        } else {

            // TODO: display a msg about failing to add the comps
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end addCompsToMainView()
