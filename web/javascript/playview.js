'use strict';

/*
 * Script that implements the actions that you can do in the detailed composition view (add comment, like, favorite, etc).
 * Used in Beginner.html, Intermediate.html and Advanced.html
 * @author Ville L / Mikael R
 */

// this gets called when you click on an individual composition in the larger list view;
// takes you to the detailed comp view and loads all the needed functionality for it.
const loadPlayView = (compId, element, currentPage) => {
    
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
        
                        
        // needs to be here due to the order of following operations 
        let commentDisplayFeed;
        
        if (myJson.status === "gotCompById") {
            
/*----------------Generate play screen and set references for it--------*/

            let likeSrc = "resources/thumb-white.png";
            if (myJson.ownLike === 'true') {
                likeSrc = "resources/thumb-green.png";
            }
        
            let favSrc = "resources/favorite-white.png";
            if (myJson.ownFav === 'true') {
                favSrc = "resources/favorite-red.png";
            }
            
            // (located at the bottom of the file)
            // add everything except comments
            buildCompViewHTML(element, myJson.title, myJson.author, myJson.length, myJson.pages, 
            myJson.video, myJson.sheet, myJson.likenum, myJson.favnum, myJson.comms, likeSrc, favSrc);
            
            commentDisplayFeed = document.getElementById("comment-feed"); // container for all comments
            
            // add the existing comments (including their content)
            getComments(compId, commentDisplayFeed);
        } 
        else {
            // TODO: do smthng...
        }
        
        getDelButton();

/*------------------- Adding a new comment ------------------*/

        const commentButton = document.getElementById("comment-button"); // to send it 
        const commentInput = document.getElementById("comment-field"); // to write in
        const commentCounter = document.getElementById("comment-count"); // counter

        commentButton.addEventListener('click', () => {
            
            if (commentInput.value !== "") {
                
                addComment(compId, commentDisplayFeed, commentInput, commentCounter);
                commentInput.value = ""; // clear the comment input field                                                                         
            }
        }); // end commentButton.addEventListener()
        
        /*------------------- Adding/removing likes and favorites ------------------*/

        const likeButton = document.getElementById("thumb-button2");
        const favButton = document.getElementById("favorite-button2"); 
        const likeCounter = document.getElementById("like-count2"); // like counter
        const favCounter = document.getElementById("favorite-count2"); // favorite counter
        
        likeButton.addEventListener('click', () => {

            if (likeButton.getAttribute("src") === 'resources/thumb-white.png') {
                addLike(compId, likeCounter, likeButton);      
            } else {   
                removeLike(compId, likeCounter, likeButton);
            }});

        favButton.addEventListener('click', () => {

            if (favButton.getAttribute("src") === 'resources/favorite-white.png') {
                addFavorite(compId, favCounter, favButton);
            } else {    
                removeFavorite(compId, favCounter, favButton);
            }});

        /*--------Going back to comp menu with backarrow ----*/
        
        const arrowButton = document.getElementById('back-arrow');

        arrowButton.addEventListener('click', () => {

            window.location.href = currentPage;
        });    
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
}; // end loadPlayView()

// ---------------------------------------------------------------------------------------------------------

// it's a dedicated function solely in order not to take up a humongous amount of space where it actually matters -.-        
function buildCompViewHTML(element, title, author, length, pages, video, sheet, likenum, favnum, comms, srcForLikes, srcForFavs) {
    
    element.innerHTML = 
      `<main id="comp-wrapper">
          <div class="composition-title">
              <div id="arrow-wrapper"><img src="resources/backarrow.png" id="back-arrow"></div>
              <div id=title-wrapper1337><h1>${title}</h1></div>
              <div id="delete-wrapper"><img src="resources/delete.png" width="50px" height="50px" id="delete-pic"></div>
          </div>

          <div class="composition-youtube">
              <iframe src=${video} frameBorder="0" allowfullscreen>
              </iframe>
          </div>
          <div class="composition-sheet">
              <img src=${sheet}>
          </div>
          <div class="composition-stats-big">
              <div id="author-box" class="text-stat-wrapper"><p>Author: ${author}</p> </div>
              <div id="duration-box" class="text-stat-wrapper"><p>Duration: ${length}</p></div>
              <div id="pages-box" class="text-stat-wrapper"><p>Level: Beginner</p></div>
              <div id="level-box" class="text-stat-wrapper"><p>Pages: ${pages}</p></div>
              <div id="space-maker"></div>
              <div class="stat-img2"><img src=${srcForLikes} id="thumb-button2"></div>
              <div class="stat-text2"><p id="like-count2">${likenum}</p> </div>
              <div class="stat-img2" id="favorite-icon"><img src=${srcForFavs} id="favorite-button2"> </div>
              <div class="stat-text2"><p id="favorite-count2">${favnum}</p> </div>
              <div class="stat-img2"><img src="resources/comment.png"></div>
              <div class="stat-text2"><p id="comment-count">${comms}</p></div>
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
} // end buildCompViewHTML()

// ---------------------------------------------------------------------------------------------------------

// Get listeners for delete button
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

// ---------------------------------------------------------------------------------------------------------

// get the existing comments (including their content) and attach them below the composition
function getComments(id, element) {

    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `id=${id}`
    };

    fetch('App/CommentService/GetCommentsByCompId', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => { 

        if (myJson.comm_1 !== null && myJson.comm_1 !== undefined) {
            
            const jsonLength = Object.keys(myJson).length;
            
            for (let i = 1; i < jsonLength; i++) {
                  
                // this weird operation is needed due to the format of the json that comes from the server... 
                // Consulting the CommentService.java and ResponseString.java classes should clarify this
                let actualCommentX = Object.values(myJson)[i]; // String
                const replacedHipsut = actualCommentX.replace(/'/g, "\""); // the ' had to be used in order to parse the json on the server-side... now that they've served their purpose, we must get rid of them
                const j = JSON.parse(replacedHipsut);
                
                element.innerHTML += `<div class="comment-field"><h1>${j.adder}:</h1><p>${j.content}</p><br>
                                      <h2>${j.addtime}</h2></div>`; 
            } // end for-loop  
        }
        else {
            // TODO: display an error msg
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end getComments()

// ---------------------------------------------------------------------------------------------------------

function addComment(id, displayFeed, input, counter) {

    const d = new Date();
    const time = d.getTime(); // time in milliseconds

    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin',
        body: `content=${input.value}&compid=${id}&time=${time}`
    };

    fetch('App/CommentService/AddComment', request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => { 

        if (myJson.status === 'addedComment') {

            counter.innerHTML = myJson.numOfComms;

            displayFeed.innerHTML += `<div class="comment-field"><h1>${myJson.adder}:</h1><p>${myJson.content}</p><br>
            <h2>${myJson.time}</h2></div>`;                  
        }
        else {

            // TODO: display an error msg
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end addComment()

// ---------------------------------------------------------------------------------------------------------

function addLike(compId, counter, button) {

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

            counter.innerHTML = myJson.numOfLikes;
            button.src = 'resources/thumb-green.png';   
        } else {

            // TODO: display a msg about failing to add the like
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end addLike()

// ---------------------------------------------------------------------------------------------------------

function removeLike(compId, counter, button) {

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

            counter.innerHTML = myJson.numOfLikes;
            button.src = 'resources/thumb-white.png';   
        } else {

            // TODO: display a msg about failing to remove the like
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end removeLike()

// ---------------------------------------------------------------------------------------------------------

function addFavorite(compId, counter, button) {

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

            counter.innerHTML = myJson.numOfFavs;
            button.src = 'resources/favorite-red.png';
        } else {

            // TODO: display a msg about failing to add the favorite
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end addFavorite()

// ---------------------------------------------------------------------------------------------------------

function removeFavorite(compId, counter, button) {

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

            counter.innerHTML = myJson.numOfFavs;
            button.src = 'resources/favorite-white.png';  
        } else {

            // TODO: display a msg about failing to remove the favorite
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end removeFavorite()
