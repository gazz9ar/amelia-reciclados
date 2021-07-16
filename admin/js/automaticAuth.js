

// CADA 5 SEGUNDOS
var intervalId = window.setInterval(function () {

    // PREGUNTO SI ESTA EN ALGUNA PAG. DE ADMIN
    
     // PREGUNTO SI ESTA EN ALGUNA PAG. DE ADMIN
      auth.onAuthStateChanged((user) => {
        if (user.uid === 'da2j56RuXxbXP6RQ91tgHYl9zTX2') {
            
            user.getIdTokenResult().then( (msj) => {
                console.log(msj);
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
            });
  
        } else {
  
          window.location.replace("http://127.0.0.1:5500/index.html");
            
        }
      });
    
  
  }, 500);
  
  