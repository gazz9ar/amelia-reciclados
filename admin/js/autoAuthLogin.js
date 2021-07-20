



firebase.auth().onAuthStateChanged((user) => {
  
    if (user) {     
      const userlogged = firebase.auth().currentUser;
      if (userlogged.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2') {        
        
        // admin logged in
      
        window.location.replace('http://127.0.0.1:5500/admin/index.html');
        
      }
      else 
      {
        // usuario comun, redirecciona al index.html
       
        window.location.replace('http://127.0.0.1:5500/index.html');
      }
      

    } else {

      
      //no hay usuario logeado
      

    }
  });