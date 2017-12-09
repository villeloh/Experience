'use strict';

const mainElement = document.getElementById('write-here');
const imageWrapper = document.getElementById('image-wrapper');
const beginnerButton = document.querySelector('#beginnerBtn');

addCompsToMainView(0); // diff = 0 means 'beginner'

// for refreshing the page (in case someone else has added new compositions)
beginnerButton.addEventListener('click', () => {
    
    addCompsToMainView(0);
});

function addCompsToMainView(diff) {
    
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
                
                imageWrapper.innerHTML += 
                        
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
            
            const images = document.getElementsByClassName('composition-image');         
            const compIdDivs = document.querySelectorAll('.composition #hiddenIdDiv');
            
            for (let i = 0; i < images.length; i++) {

                images[i].addEventListener('click', () => {

                    loadPlayView(compIdDivs[i].innerText);  // move into the larger, more detailed comp view
                });
            }   
        } else {

            // TODO: display a msg about failing to add the comps
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end addCompsToMainView()

const loadPlayView = (compId) => {
    
    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `id=${compId}`
    };
    
    fetch('App/CompService/GetCompById', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {
        
/*---------------------Generate play screen and get references for it------------------------------*/
        
        mainElement.innerHTML = `<main id="comp-wrapper">
                             <div class="composition-title">
                                 <div id="arrow-wrapper"><img src="resources/backarrow.png" id="back-arrow"></div>
                                 <div id=title-wrapper1337><h1>${myJson.title}</h1></div>
                                 <div id="delete-wrapper"><img src="resources/delete.png" width="50px" height="50px" id="delete-pic"></div>
                             </div>

                             <div class="composition-youtube">
                                 <iframe src=${myJson.video} frameBorder="0" allowfullscreen>
                                 </iframe>
                             </div>
                             <div class="composition-sheet">
                                 <img src=${myJson.sheet}>
                             </div>
                             <div class="composition-stats-big">
                                 <div id="author-box" class="text-stat-wrapper"><p>Author: ${myJson.author}</p> </div>
                                 <div id="duration-box" class="text-stat-wrapper"><p>Duration: ${myJson.length}</p></div>
                                 <div id="pages-box" class="text-stat-wrapper"><p>Level: Beginner</p></div>
                                 <div id="level-box" class="text-stat-wrapper"><p>Pages: ${myJson.pages}</p></div>
                                 <div id="space-maker"></div>
                                 <div class="stat-img2"><img src="resources/thumb-white.png" id="thumb-button2"></div>
                                 <div class="stat-text2"><p id="like-count2">${myJson.likenum}</p> </div>
                                 <div class="stat-img2" id="favorite-icon"><img src="resources/favorite-white.png" id="favorite-button2"> </div>
                                 <div class="stat-text2"><p id="favorite-count2">${myJson.favnum}</p> </div>
                                 <div class="stat-img2"><img src="resources/comment.png"></div>
                                 <div class="stat-text2"><p id="comment-count">${myJson.comms}</p></div>
                             </div>
                             <div class="comment-box" id="comment-feed">
                                 <div class="title" id="title-box"><h1>Comments: </h1></div>
                             </div>
                             <div class="leave-comment">
                                 <div class="leave-comment-title">
                                     <h1>Leave a comment: <br> </h1>
                                     <textarea class="enter-comment" id="comment-field"></textarea>
                                     <input type="submit" value="Comment" id="comment-button">
                                 </div>
                             </div>
                         </main>`;
        getDelButton();
        
/*-------------- Timestamp function ----------------*/

        const getTime = () => {
        let time = new Date().toLocaleString();
        return time;
    };

/*------------------- Adding a new comment ------------------*/

        const commentButton = document.getElementById("comment-button");
        const commentDisplayFeed = document.getElementById("comment-feed");
        const commentInput = document.getElementById("comment-field");
        const commentElement = document.getElementById("comment-count");

        let comments;

        const getComment = () => {
            if (commentInput.value !== "") {
            let comment = commentInput.value;
            return comment;
            }
        };

        commentButton.addEventListener('click', () => {
            if (getComment().length > 0) {
            comments = commentElement.innerHTML;
            comments++;
            commentElement.innerHTML = comments;
            commentDisplayFeed.innerHTML += `<div class="comment-field"><h1> Mikael:</h1><p>` + getComment() + `</p><br> <h2>` + getTime() + `</h2>
                                              </div>`;
            commentInput.value = "";                                                                            }
        });

        const thumbButton2 = document.getElementById("thumb-button2");
        const favoriteButton2 = document.getElementById("favorite-button2");
        /*---------------- New listeners for play page likes/favorites --------------*/
        thumbButton2.addEventListener('click', () => {

            // TODO: disable functionality if not logged in !!!!!!!!!!!!!!!!!!!!

            if (thumbButton2.getAttribute("src") === 'resources/thumb-white.png') {

                addLike(compId);      
            } else {   
                removeLike(compId);
            }
           });

        favoriteButton2.addEventListener('click', () => {

            if (favoriteButton2.getAttribute("src") === 'resources/favorite-white.png') {

                addFavorite(compId);
            } else {    
               removeFavorite(compId);
            }
           });

        /*----------------------Going back to comp menu with backarrow -------------------------*/
        const arrowButton = document.getElementById('back-arrow');

        arrowButton.addEventListener('click', () => {

            window.location.href = "Beginner.html";

        });  
        
        const compList1 = document.getElementById('image-wrapper-1');
        const buttonElement1 = document.getElementById("test-button-level-1");
        const thumbElement2 = document.getElementById("like-count2");
        const favoriteElement2 = document.getElementById("favorite-count2");

        function addLike(compId) {

            const request = { 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
                'Cookie': document.cookie},
                method: 'POST',
                credentials: 'same-origin',
                body: `id=${compId}`
            };

            fetch('App/CompService/LikeComp', request).then((response) => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');

            }).then((myJson) => {

                if (myJson.status === 'likedComp') {

                    thumbElement2.innerHTML = myJson.numOfLikes;
                    thumbButton2.src = 'resources/thumb-green.png';   
                } else {

                    // TODO: display a msg about failing to add the like
                }
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            }); // end fetch()

        } // end addLike()

        function removeLike(compId) {

            const request = { 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
                'Cookie': document.cookie},
                method: 'POST',
                credentials: 'same-origin',
                body: `id=${compId}`
            };

            fetch('App/CompService/RemoveLike', request).then((response) => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');

            }).then((myJson) => {

                if (myJson.status === 'removedLike') {

                    thumbElement2.innerHTML = myJson.numOfLikes;
                    thumbButton2.src = 'resources/thumb-white.png';   
                } else {

                    // TODO: display a msg about failing to remove the like
                }
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            }); // end fetch()
        } // end removeLike()

        function addFavorite(compId) {

            const request = { 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
                'Cookie': document.cookie},
                method: 'POST',
                credentials: 'same-origin',
                body: `id=${compId}`
            };

            fetch('App/CompService/FavoriteComp', request).then((response) => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');

            }).then((myJson) => {

                if (myJson.status === 'favoritedComp') {

                    favoriteElement2.innerHTML = myJson.numOfFavs;
                    favoriteButton2.src = 'resources/favorite-red.png';
                } else {

                    // TODO: display a msg about failing to add the favorite
                }
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            }); // end fetch()
        } // end addFavorite()

        function removeFavorite(compId) {

            const request = { 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
                'Cookie': document.cookie},
                method: 'POST',
                credentials: 'same-origin',
                body: `id=${compId}`
            };

            fetch('App/CompService/RemoveFavorite', request).then((response) => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');

            }).then((myJson) => {

                if (myJson.status === 'removedFavorite') {

                    favoriteElement2.innerHTML = myJson.numOfFavs;
                    favoriteButton2.src = 'resources/favorite-white.png';  
                } else {

                    // TODO: display a msg about failing to remove the favorite
                }
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            }); // end fetch()
        } // end removeFavorite()
        
        
        
        
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
}; // end loadPlayView()

/*----------------------Get listeners for delete button--------------------------*/
const getDelButton = () => {
    const popUp = document.querySelector(".pop-up");
    const popUpButton = document.getElementById('delete-pic');
    const yesButton = document.querySelector(".yes-button");
    const noButton = document.querySelector(".no-button");

    popUpButton.addEventListener('click', () => {
            document.body.setAttribute("style","pointer-events: none;");
            popUp.style.display = 'flex';    
    });

    noButton.addEventListener('click', () => {
        popUp.style.display = 'none';
        document.body.setAttribute("style","pointer-events: auto;");
    });

    yesButton.addEventListener('click', () => {
        popUp.style.display = 'none';
        document.body.setAttribute("style","pointer-events: auto;");
    });
}; // end getDelButton()
