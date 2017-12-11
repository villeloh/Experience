'use strict';

/*
 * Script for search operations (among compositions).
 * @author Ville L
 */

const resultList = document.querySelector('#searchResultList');
const searchString = window.location.hash.substring(1); // get rid of the initial hashtag

search(searchString, resultList);

function search(searchStr, element) {
    
    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `searchStr=${searchStr}`
    };
    
    fetch('App/CompService/TitleSearch', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {
        
        if (myJson.status === 'searchCompleted') {
            
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
                            <div class ="composition_stats">
                                <div class="stat-img"><img src="resources/thumb-white.png"></div>
                                <div class="stat-text"><p id="like-count">${jsonFinal.likenum}</p> </div>
                                <div class="stat-img"><img src="resources/favorite-white.png"> </div>
                                <div class="stat-text"><p id="favorite-count">${jsonFinal.favnum}</p> </div>
                                <div class="stat-img"><img src="resources/comment.png"></div>
                                <div class="stat-text"><p id="comment-count">${jsonFinal.comms}</p></div>   
                            </div>
                        </main>`;
            } // end for-loop          
        } else {           
            // do smthng...
        }
    }).catch(function(error) {
        
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end search()
