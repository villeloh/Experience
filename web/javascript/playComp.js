'use strict';
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

  /*-------------- Timestamp function ----------------*/

const getTime = () => {
    let time = new Date().toLocaleString();
    return time;
}

/*------------------- Adding a new comment ------------------*/

const commentButton = document.getElementById("comment-button");
const commentDisplayFeed = document.getElementById("comment-feed")
const commentInput = document.getElementById("comment-field");
const commentElement = document.getElementById("comment-count");

var comments;

const getComment = () => {
    if (commentInput.value != "") {
    let comment = commentInput.value;
    return comment;
    }
}

commentButton.addEventListener('click', () => {
    if (getComment().length > 0) {
    comments = commentElement.innerHTML;
    comments++;
    commentElement.innerHTML = comments;
    commentDisplayFeed.innerHTML += `<div class="comment-field"><h1> Mikael:</h1><p>` + getComment() + `</p><br> <h2>` + getTime() + `</h2>
                                      </div>`;
    commentInput.value = "";                                                                            }
});
