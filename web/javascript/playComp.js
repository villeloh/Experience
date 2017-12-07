'use strict';


//Function that it loaded when normal view of all comps is displayed
const loadNormalView = () => {
/* ------------------ Like and favorite buttons -----------------*/
const favoriteElement = document.getElementById("favorite-count");
const thumbElement = document.getElementById("like-count");

const favoriteButton = document.getElementById("favorite-button");
const thumbButton = document.getElementById("thumb-button");
var likeCount;
var favoriteCount;


thumbButton.addEventListener('click', () => {
    likeCount = thumbElement.innerHTML;
    if (thumbButton.getAttribute("src") == 'resources/thumb-white.png') {
        likeCount++;
        thumbElement.innerHTML = likeCount;
        thumbButton.src = 'resources/thumb-green.png';
    } else {
       likeCount--;
       thumbElement.innerHTML = likeCount;
       thumbButton.src = 'resources/thumb-white.png';
    }
   });

favoriteButton.addEventListener('click', () => {
    favoriteCount = favoriteElement.innerHTML;
    if (favoriteButton.getAttribute("src") == 'resources/favorite-white.png') {
        favoriteCount++;
        favoriteElement.innerHTML = favoriteCount;
        favoriteButton.src = 'resources/favorite-red.png';
    } else {
       favoriteCount--;
       favoriteElement.innerHTML = favoriteCount;
       favoriteButton.src = 'resources/favorite-white.png';
    }
   });
   const compImageElement = document.getElementById('play-id-x');

   compImageElement.addEventListener('click', () => {
       loadPlayView();  // Calling the PLAY VIEW method here
   });
} // Normal view ends here !

loadNormalView(); //So that it gets ran when js is called initially






//Function that it loaded when the PLAY VIEW of composition is displayed
const loadPlayView = () => {

/*---------------------Generate play screen and get references for it------------------------------*/

const mainElement = document.getElementById('write-here');
    mainElement.innerHTML = `<main id="comp-wrapper">
                                 <div class="composition-title">
                                     <div id="arrow-wrapper"><img src="resources/backarrow.png" id="back-arrow"></div>
                                     <div id=title-wrapper1337><h1>Composition title here!</h1></div>
                                 </div>
                                 <div class="composition-youtube">
                                     <iframe src="https://www.youtube.com/embed/IUzNSXXrDis" frameBorder="0">
                                     </iframe>
                                 </div>
                                 <div class="composition-sheet">
                                     <img src="resources/sheet.jpg">
                                 </div>
                                 <div class="composition-stats-big">
                                     <div id="author-box" class="text-stat-wrapper"><p>Author: J.S.Bach</p> </div>
                                     <div id="duration-box" class="text-stat-wrapper"><p>Duration: 1:39</p></div>
                                     <div id="pages-box" class="text-stat-wrapper"><p>Level: Beginner</p></div>
                                     <div id="level-box" class="text-stat-wrapper"><p>Pages: 1</p></div>
                                     <div id="space-maker"></div>
                                     <div class="stat-img2"><img src="resources/thumb-white.png" id="thumb-button2"></div>
                                     <div class="stat-text2"><p id="like-count2">6</p> </div>
                                     <div class="stat-img2" id="favorite-icon"><img src="resources/favorite-white.png" id="favorite-button2"> </div>
                                     <div class="stat-text2"><p id="favorite-count2">4</p> </div>
                                     <div class="stat-img2"><img src="resources/comment.png"></div>
                                     <div class="stat-text2"><p id="comment-count">0</p></div>
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

const favoriteElement2 = document.getElementById("favorite-count2");
const thumbElement2 = document.getElementById("like-count2");
const favoriteButton2 = document.getElementById("favorite-button2");
const thumbButton2 = document.getElementById("thumb-button2");
var likeCount2;
var favoriteCount2;

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

/*----------------New listeners for play page likes/comments--------------*/
thumbButton2.addEventListener('click', () => {
    likeCount2 = thumbElement2.innerHTML;
    if (thumbButton2.getAttribute("src") == 'resources/thumb-white.png') {
        likeCount2++;
        thumbElement2.innerHTML = likeCount2;
        thumbButton2.src = 'resources/thumb-green.png';
    } else {
       likeCount2--;
       thumbElement2.innerHTML = likeCount2;
       thumbButton2.src = 'resources/thumb-white.png';
    }
   });

favoriteButton2.addEventListener('click', () => {
    favoriteCount2 = favoriteElement2.innerHTML;
    if (favoriteButton2.getAttribute("src") == 'resources/favorite-white.png') {
        favoriteCount2++;
        favoriteElement2.innerHTML = favoriteCount2;
        favoriteButton2.src = 'resources/favorite-red.png';
    } else {
       favoriteCount2--;
       favoriteElement2.innerHTML = favoriteCount2;
       favoriteButton2.src = 'resources/favorite-white.png';
    }
   });


/*----------------------Going back to comp menu with backarrow -------------------------*/
const arrowButton = document.getElementById('back-arrow');

arrowButton.addEventListener('click', () => {
     mainElement.innerHTML = `    <div id="title-wrapper">
                                      <div class="title-comp"><h1> Beginner </h1>  </div>
                                  </div>
                                  <div id = "image-wrapper">
                                      <main class="composition">
                                          <div class="composition-title-level-1">Mozard first symphony<br>
                                           Made in 1950 by the mozard</div>
                                          <div id="play-id-x" class ="composition-image"><img src="resources/play-button.PNG"></div>
                                       <div class ="composition-stats">
                                           <div class="stat-img"><img src="resources/thumb-white.png" id="thumb-button"></div>
                                           <div class="stat-text"><p id="like-count">6</p> </div>
                                           <div class="stat-img"><img src="resources/favorite-white.png" id="favorite-button"> </div>
                                           <div class="stat-text"><p id="favorite-count">4</p> </div>
                                           <div class="stat-img"><img src="resources/comment.png"></div>
                                           <div class="stat-text"><p id="comment-count"> 0 </p></div>
                                       </div>
                                      </main>
                                  </div>`;
    loadNormalView();   //Loading backto normal view
});
}; //loadPlayView function ends HERE





/*  This could be used (?) to start building the proper add new comp ()

const compList1 = document.getElementById('image-wrapper-1');
const buttonElement1 = document.getElementById("test-button-level-1");

const addNewComposition = (list) => {
list.innerHTML += `<div class="composition">
                       <div class="composition-title-level-1">Anh. 115 Minuet <br> J.S.Bach </div>
                       <div class ="composition-image"><img src="play-button.png"></div>
                       <div class ="composition-stats">
                       <div class="stat-img"><img src="thumb-white.png"></div>
                       <div class="stat-text"><p id="like-count"> 1</p> </div>
                       <div class="stat-img"><img src="like-white.png"> </div>
                       <div class="stat-text"><p id="favorite-count"> 1</p> </div>
                       <div class="stat-img"><img src="test123.png"></div>
                       <div class="stat-text"><p> 1 </p></div>
                       </div>
                 </div>`;
};
*/