const profileSettings = document.getElementById("profile-settings");
const username = $('#username');
const userEmail = $('#user-email');

firebase.auth().onAuthStateChanged((user) => {

    if (user) {

        userEmail.html(user.email);
        getCollection('users',user.email).then((p) => {
            
             usuarioLogeado = p.data();
             if (usuarioLogeado.nick == '') {
            
            } else {
                username.html(usuarioLogeado.nick);
            }
        }).catch();
        
        
        
    }

});

function openProfileSettings()
{
    $('#profile-settings').toggle('fast');

}


function goToShop() 
{
    window.location.replace('carrito.html');    
}

