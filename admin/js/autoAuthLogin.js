



firebase.auth().onAuthStateChanged((user) => {
  
    if (user) {     
      const userlogged = firebase.auth().currentUser;
      if (userlogged.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2' || userlogged.uid == '4kJInL9WegV9sB4XWoUqUspAkfq2') {        
        
        // admin logged in
      
        window.location.replace('/admin/panel-shop.html');
        
      }
      else 
      {
        // usuario comun, redirecciona al index.html
       
        window.location.replace(urlAnterior);

      }
      

    } else {

      
      //no hay usuario logeado
      

    }
  });