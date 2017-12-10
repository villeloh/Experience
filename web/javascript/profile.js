'use strict';

if (!loggedIn()) {

    window.location.href = "LogInPage.html";
}

const profileTitleElement = document.querySelector('#profileTitle');
const profileImgElement = document.querySelector('#profileImg');

getUserStats(profileTitleElement, profileImgElement);

const element = document.getElementById('arrow5'),
style = window.getComputedStyle(element),
right5 = style.getPropertyValue('transform');

const element2 = document.getElementById('arrow6'),
style2 = window.getComputedStyle(element2),
right6 = style.getPropertyValue('transform');

const element3 = document.getElementById('arrow7'),
style3 = window.getComputedStyle(element3),
right7 = style.getPropertyValue('transform');

const element4 = document.getElementById('arrow8'),
style4 = window.getComputedStyle(element4),
right8 = style.getPropertyValue('transform');

const compDropElem = document.getElementById('dropdown');
const favDropElem = document.getElementById('dropdown2');
const likeDropElem = document.getElementById('dropdown3');
const commDropElem = document.getElementById('dropdown4');

const comps = document.getElementById("uploads");
const favs = document.getElementById("uploads2");
const likes = document.getElementById("uploads3");
const comments = document.getElementById("uploads4");

const popUp = document.querySelector(".pop-up");
const popUpButton = document.getElementsByClassName('not-a-link');
const yesButton = document.querySelector(".yes-button");
const noButton = document.querySelector(".no-button");

for (let i = 0; i < popUpButton.length; i++) {
    popUpButton[i].addEventListener('click', () => {
        document.body.setAttribute("style","pointer-events: none;");
        popUp.style.display = 'flex';
    });
}

noButton.addEventListener('click', () => {
    popUp.style.display = 'none';
    document.body.setAttribute("style","pointer-events: auto;");
});

yesButton.addEventListener('click', () => {
    popUp.style.display = 'none';
    document.body.setAttribute("style","pointer-events: auto;");
});

comps.addEventListener('click', () => {
    hideMenu(right5, element, compDropElem);
    getOwnItems('comps', compDropElem); // it fetches them whether you're opening or closing the menu... wasteful, but, meh 
});
favs.addEventListener('click', () => {
    hideMenu(right6, element2, favDropElem);
    getOwnItems('favs', favDropElem);
});
likes.addEventListener('click', () => {
    hideMenu(right7, element3, likeDropElem);
    getOwnItems('likes', likeDropElem);
});
comments.addEventListener('click', () => {
    hideMenu(right8, element4, commDropElem);
    getOwnItems('comments', commDropElem);
});

const hideMenu =  (arrow, element, dropElement) => {
        arrow = window.getComputedStyle(element).getPropertyValue('transform');
    if (arrow === 'rotate(-45deg)' || arrow === 'matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0)') {
        element.style.transform = "rotate(45deg)";
        arrow = 'rotate (45deg)';
        dropElement.style.display = "inline";
    } else {
        element.style.transform = "rotate(-45deg)";
        dropElement.style.display = "none";
        arrow = 'rotate(-45deg)';
    }
};

// populates the little sub-menus on the right with your own liked and favorited compositions, etc.
function getOwnItems(clickedBtn, element) {
    
    let cmdString;
    
    if (clickedBtn === 'comps') {
        cmdString = "App/CompService/GetCompsByOwnId";
    } else if (clickedBtn === 'favs') {
        cmdString = "App/CompService/GetCompsByFavs";
    } else if (clickedBtn === 'likes') {
        cmdString = "App/CompService/GetCompsByLikes";
    } else if (clickedBtn === 'comments') {
        cmdString = "App/CommentService/GetCommentsByOwnId"; 
    }
    
    const request = { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',  
        'Cookie': document.cookie},
        method: 'POST',
        credentials: 'same-origin'
    };
    
    fetch(cmdString, request).then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

        if (myJson.item_1 !== null && myJson.item_1 !== undefined) {

            const jsonLength = Object.keys(myJson).length;
            
            for (let i = 1; i < jsonLength; i++) {
                  
                // this weird operation is needed due to the format of the json that comes from the server... 
                // Consulting the CompService.java and ResponseString.java classes should clarify this
                let actualItem = Object.values(myJson)[i]; // String
                const replacedHipsut = actualItem.replace(/'/g, "\""); // the ' had to be used in order to parse the json on the server-side... now that they've served their purpose, we must get rid of them
                const j = JSON.parse(replacedHipsut);
                
                if (myJson.status === "gotCommentsByOwnId") {
                    
                    element.innerHTML += `<li>To ${j.comp}: ${j.content} | ${j.addtime}</li>`;
                } else { // composition
                    
                    element.innerHTML += `<li>${j.diff} ${j.title} by ${j.author} | Comms: ${j.comms} | Likes: ${j.likenum} | Favs: ${j.favnum} | ${j.addtime}</li>`;                    
                }     
            } // end for-loop  
        } else {
            // TODO: display a msg about failure
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()  
} // end getOwnItems()
