'use strict';

/*
* Javascript for the admin panel page.
* @author Ville L, Mikael R
*/

const userList = document.querySelector('#userList');

getOwnAdminStatus(); // it calls the other functions... messy but we're in a real hurry here!

/*---------------------- POP UP ------------------*/

const popUp = document.querySelector(".pop-up");
const popUpButton = document.getElementsByClassName('info-bar-button');
const yesButton = document.querySelector(".yes-button");
const noButton = document.querySelector(".no-button");

const addListeners = () => {    //Function might not be needed once you fetch users from db, wrapped it in function to have it work with test button
    for (let i = 0; i < popUpButton.length; i++) {
        popUpButton[i].addEventListener('click', () => {
            document.body.setAttribute("style", "pointer-events: none;");
            popUp.style.display = 'flex';
        });
    }
};

addListeners();

noButton.addEventListener('click', () => {
    popUp.style.display = 'none';
    document.body.setAttribute("style", "pointer-events: auto;");
});

yesButton.addEventListener('click', () => {
    popUp.style.display = 'none';
    document.body.setAttribute("style", "pointer-events: auto;");
});

// gets all the users so you can manage their rights
function getAllUsers(attachToThis, ownAdminRights) {

    const request = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': document.cookie
        },
        method: 'POST',
        credentials: 'same-origin'
    };

    fetch('App/AdminService/GetAllUsers', request).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

        if (myJson.status === 'gotAllUsers') {

            const jsonLength = Object.keys(myJson).length;

            for (let i = 1; i < jsonLength; i++) {

                // this weird operation is needed due to the format of the json that comes from the server... 
                // Consulting the CompService.java and ResponseString.java classes should clarify this
                let actualItem = Object.values(myJson)[i]; // String
                const replacedHipsut = actualItem.replace(/'/g, "\""); // the ' had to be used in order to parse the json on the server-side... now that they've served their purpose, we must get rid of them
                const j = JSON.parse(replacedHipsut);

                attachToThis.innerHTML += `<li class="adminListItem">Id: <p id="idField">${j.id}</p> | Alias: ${j.alias} | Admin: ${j.admin} |<div class="grantA"> | GRANT ADMIN LEVEL | </div><div class="revokeA"> | REVOKE ADMIN RIGHTS | </div><div class="delUser"> | DELETE USER</div></li><br>`;

            } // end for-loop  

            // two for-loops because I'm not sure how to select the 'next' buttons each time
            const grantBtns = document.querySelectorAll('.grantA');
            const revokeBtns = document.querySelectorAll('.revokeA');
            const deleteUserBtns = document.querySelectorAll('.delUser');
            const ids = document.querySelectorAll('#idField');

            for (let i = 0; i < grantBtns.length; i++) {

                deleteUserBtns[i].onclick = () => {

                    deleteAnyUser(ownAdminRights, ids[i].innerText); // check within the function itself as to who you can delete (not other admins unless you're a super)
                };

                if (ownAdminRights === '1') {

                    grantBtns[i].style.display = "none";
                    revokeBtns[i].style.display = "none";
                }
                else if (ownAdminRights === '2') { // only the superadmin should be able to do these operations

                    grantBtns[i].style.display = 'inline';
                    grantBtns[i].onclick = () => {

                        console.log("got into on-click grant block");
                        grantAdminRights(ids[i].innerText);
                    };

                    revokeBtns[i].style.display = 'inline';
                    revokeBtns[i].onclick = () => {

                        revokeAdminRights(ids[i].innerText);
                    };
                } // end if   
            } // end for-loop   
        } else {
            // TODO: display a msg about failure to get users
        }
    }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()  
} // end getAllUsers()

function getOwnAdminStatus() {

    const request = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': document.cookie
        },
        method: 'POST',
        credentials: 'same-origin'
    };

    fetch('App/AdminService/GetOwnAdminStatus', request).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

            if (myJson.status === '0') { // i.e., the admin level
                window.location.href = "index.html"; // only admins should be here!
            } else {
                getAllUsers(userList, myJson.status); // awkward, but the value of ownAdminRights must be known when we call this
            }
        }
    ).catch(function (error) {

        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end getOwnAdminStatus()

function grantAdminRights(id) {

    const request = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': document.cookie
        },
        method: 'POST',
        credentials: 'same-origin',
        body: `userId=${id}`
    };

    fetch('App/AdminService/GrantAdmin', request).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

            console.log("got to grant fetch");

            if (myJson.status === 'madeNewAdmin') {

                window.location.href = "adminpanel.html"; // refresh
            } else {

                // TODO: notify of failure...
            }
        }
    ).catch(function (error) {

        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()   
} // end grantAdminRights()

function revokeAdminRights(id) {

    const request = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': document.cookie
        },
        method: 'POST',
        credentials: 'same-origin',
        body: `id=${id}`
    };

    fetch('App/AdminService/RevokeAdmin', request).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

            if (myJson.status === 'revokedAdmin') {

                window.location.href = "adminpanel.html"; // refresh
            } else {

                // TODO: notify of failure...
            }
        }
    ).catch(function (error) {

        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()
} // end revokeAdmin()

function deleteAnyUser(ownRights, id) {

    const request = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': document.cookie
        },
        method: 'POST',
        credentials: 'same-origin',
        body: `id=${id}&ownRights=${ownRights}`
    };

    fetch('App/AdminService/DeleteAnyUser', request).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');

    }).then((myJson) => {

            if (myJson.status === 'deletedOwnUser') {

                deleteCookies();
                window.location.href = "index.html";

            } else if (myJson.status === 'deletedOtherUser') {

                window.location.href = "adminpanel.html"; // refresh
            } else if (myJson.status === 'deniedToDeleteOtherAdmin') {

                // do smthng...
            }
        }
    ).catch(function (error) {

        console.log('There has been a problem with your fetch operation: ' + error.message);
    }); // end fetch()    
} // end deleteAnyUser()
