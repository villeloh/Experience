'use strict';


/*
* Javascript user page (Is this used?)
* Mikael R
*/

const userTestButton = document.getElementById('userTesttt');
const infoElement = document.getElementById('user-list-wrapper');

userTestButton.addEventListener('click', () => {
    addUser();
    console.log("clicked");
});


const addUser = () => {
console.log("working");
    infoElement.innerHTML += `<div class="information-bar">
                                  <div class="user-bar-info"><img src="resources/pepe.png" id="" ></div>
                                  <div class="user-bar-info"><p>FeelsGoodMan</p></div>
                                  <div class="user-bar-info"><p>Moderator</p></div>
                                  <div class="user-bar-info-small"><p>73</p></div>
                                  <div class="user-bar-info-small"><p>322</p></div>
                              </div>`;
    };