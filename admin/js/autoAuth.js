
// =================================================
// ESTE SCRIPT SE EJECUTA EN TODAS LAS PAGINAS ADMIN
// =================================================



firebase.auth().onAuthStateChanged((user) => {
  
    if (user) {     
      const userlogged = firebase.auth().currentUser;
      if (userlogged.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2') {        
        
        
        
        
      }
      else 
      {
        // no tiene UID del admin, se redirecciona
        window.location.replace('http://127.0.0.1:5500/index.html');
      }
      

    } else {

      
      //no hay usuario logeado
      window.location.replace('http://127.0.0.1:5500/index.html');

    }
  });