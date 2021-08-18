
// ====================================================
// ESTE SCRIPT SE EJECUTA EN TODAS LAS PAGINAS PUBLICAS
// ====================================================
const signOutBtn = document.getElementById("register");
const signInBtn = document.getElementById("iniciar-sesion");
const userInfo = document.getElementById("user-info");




firebase.auth().onAuthStateChanged((user) => {
  
    if (user) {     
      const userlogged = firebase.auth().currentUser;
      if (userlogged.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2' || userlogged.uid == 'aoXKR1O3T7af70FMEBJHlGG8aC22' || userlogged.uid == '4kJInL9WegV9sB4XWoUqUspAkfq2') {  
       
        
        signOutBtn.innerText = `Cerrar Sesión`;
        signOutBtn.setAttribute('onclick','signOut()'); 
        signOutBtn.setAttribute('href','#');
        signInBtn.innerHTML = `<img src="./images/iconos/user.svg" alt="UserProfile">`;
        signInBtn.href = `javascript:void(0)`;
        
      }
      else 
      {
        signOutBtn.innerText = `Cerrar Sesión`;
        signOutBtn.setAttribute('onclick','signOut()'); 
        signOutBtn.setAttribute('href','#');
        signInBtn.innerHTML = `<img src="./images/iconos/user.svg" alt="UserProfile">`;
        signInBtn.href = `javascript:void(0)`;
      }
      

    } else {

      
      //no hay usuario logeado 
      
        signOutBtn.innerText = `Registrarse`;
        signOutBtn.setAttribute('onclick',`guardarVentana('${window.location}')`); 
        signOutBtn.setAttribute('href','login.html');
        signInBtn.setAttribute('onclick',`guardarVentana('${window.location}')`); 
        signInBtn.innerHTML = `Iniciar Sesión`;
        signInBtn.href = `login.html`;

    }
  });


  function guardarVentana(url) {
      
    localStorage.setItem('urlAnterior',url);

  }