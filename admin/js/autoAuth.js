
// =================================================
// ESTE SCRIPT SE EJECUTA EN TODAS LAS PAGINAS ADMIN
// =================================================



firebase.auth().onAuthStateChanged((user) => {
  
    if (user) {     
      const userlogged = firebase.auth().currentUser;
      if (userlogged.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2' || userlogged.uid == 'aoXKR1O3T7af70FMEBJHlGG8aC22') {        
        
        
        
        
      }
      else 
      {
        // no tiene UID del admin, se redirecciona
        window.location.replace('https://gazz9ar.github.io/amelia-reciclados/');
      }
      

    } else {

      
      //no hay usuario logeado
      window.location.replace('https://gazz9ar.github.io/amelia-reciclados/');

    }
  });