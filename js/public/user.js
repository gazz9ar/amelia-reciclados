const profileSettings = document.getElementById("profile-settings");
const username = $('#username');
const userEmail = $('#user-email');



function openProfileSettings()
{
    $('#profile-settings').toggle('fast');
    
    
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            userEmail.html(user.email);
        }

    });
    

}


function goToShop() 
{
    window.location.replace( window.location.host + 'carrito');    
}

