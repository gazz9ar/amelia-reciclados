
// =================================================
// ESTE SCRIPT SE EJECUTA EN TODAS LAS PAGINAS ADMIN
// =================================================



firebase.auth().onAuthStateChanged((user) => {
  
    if (user) {     
      const userlogged = firebase.auth().currentUser;
      if (userlogged.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2' || userlogged.uid == '4kJInL9WegV9sB4XWoUqUspAkfq2' || userlogged.uid == '4kJInL9WegV9sB4XWoUqUspAkfq2') {        
        
        
        
        
      }
      else 
      {
        // no tiene UID del admin, se redirecciona
        window.location.replace('/');
        
      }
      

    } else {

      
      //no hay usuario logeado 
      
      window.location.replace('/');

    }
  });