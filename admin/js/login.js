// ===================================================       
// ARCHIVO JS PARA MANEJAR REGISTRO E INICIO DE SESIÓN
// ===================================================      
const auth = firebase.auth();

const emailElement = document.getElementById("email");
const passElement = document.getElementById("pass");
const tituloLogin = document.getElementById("titulo-login");
const btnIngresar = document.getElementById("btn-ingresar");
const btnLog = document.getElementById("div-log");
const btnReg = document.getElementById("div-reg");
const aLog = document.getElementById("a-log-text");
const aReg = document.getElementById("a-reg-text");









//  =============================================================
//  Metodo que se ejecuta al cambiar a Registrarse
//  =============================================================
const openRegister = () => {
  tituloLogin.innerText = 'Registrarse';
  passElement.setAttribute("placeholder", "Ingrese una Contraseña...");
  btnIngresar.innerText = 'Registrarse';

  btnReg.classList.add('active');
  aReg.classList.add('text-white');

  btnLog.classList.remove('active');
  aLog.classList.remove('text-white');
  aLog.style.color = '#212529'

}
//  =============================================================
//  Metodo que se ejecuta al cambiar a Inicio Sesion
//  =============================================================
const openLogin = () => {
  tituloLogin.innerText = 'Iniciar Sesión';
  passElement.setAttribute("placeholder", "Ingrese su Contraseña...");
  btnIngresar.innerText = 'Ingresar';

  btnLog.classList.add('active');
  aLog.classList.add('text-white');

  btnReg.classList.remove('active');
  aReg.classList.remove('text-white');

}


let urlAnterior = localStorage.getItem('urlAnterior');

//  =============================================================
//  Metodo que se ejecuta al clickear boton de Ingresar/Registrar
//  =============================================================
const registerLogin = () => {
  let email = emailElement.value;
  let pass = passElement.value;

  if (!btnLog.classList.contains("active")) {


    auth.createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in

        var user = userCredential.user;
        let newUser = new UsuarioCompleto(user.email,user.pass);


        Swal.fire(
          'Buen trabajo!',
          'Te has Registrado',
          'success'
        )
        tituloLogin.innerText = 'Iniciar Sesión';

        
        if (urlAnterior) {

          if (urlAnterior == 'http://127.0.0.1:5500/shop.html#') {
            window.location.replace(urlAnterior);
          }
          
          
        } else 
        {
          window.location.replace('https://gazz9ar.github.io/amelia-reciclados/');
        }
        

      })
      .catch((error) => {
        let errorCode = error.code;
        console.log(errorCode);
        let errorMessage = error.message;
        console.log(errorMessage);
        // ..
        Swal.fire({
          icon: 'error',
          title: 'Error al registrarse!',
          text: errorMessage
        })
      });

  } else {

    auth.signInWithEmailAndPassword(email, pass)
      .then( async (userCredential) => {
        // Signed in
        var user = userCredential.user;
        

        if (user.uid == 'da2j56RuXxbXP6RQ91tgHYl9zTX2') {



          // SE LOGEÓ el ADMIN
          await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has iniciado sesión correctamente!',
            showConfirmButton: false,
            timer: 1500
          })

          window.location.replace("http://127.0.0.1:5500/admin/panel-shop.html");

        } else {
          
          await  Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Has iniciado sesión correctamente!',
            showConfirmButton: false,
            timer: 1500
          })

          if (urlAnterior) {

            if (urlAnterior == 'http://127.0.0.1:5500/shop.html') {
              window.location.replace(urlAnterior);
            }
            
            
          } else 
          {
            window.location.replace(urlAnterior);
          }

          

          

        }



      })
      .catch((error) => {

        var errorMessage = error.message;
        var errorCode = error.code;

        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión!',
          text: errorMessage
        })


      });

  }

}

