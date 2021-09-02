/* BOTON menu hamburgesa mobile */
var _docHeight = 0;
let menu = document.getElementById("hamburger-menu");
let burger = document.getElementById("burger");
const whatsappLogo = $('#whatsapp-logo')

const carritoBtnMobile = $('#carrito-mobile');

function getDocHeigth() {

  
    var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    
    return _docHeight;
  
  
  
}
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
async function OpenCloseHamburger() {

    let _docHeight = 0;
    _docHeight = await getDocHeigth();

      on();
    whatsappLogo.addClass('d-none');
    
    
    $('#cant-agregada-mobile').addClass('d-none')
     $('#flex-nav').addClass('color-grisOscuro-flexnav');

     

    document.styleSheets[0].insertRule(`body::before { content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      height: ${_docHeight}px;
      z-index: 99; }`, 0);
      
      burger.classList.remove("hamburger");
      burger.classList.add("ocultar");

      carritoBtnMobile.addClass('carrito-mobile-ocultar');

      if (menu.style.display === "flex") {
        menu.style.display = "none";
      } else {
        menu.style.display = "flex";
      }    

      menu.classList.remove('animate__animated');
    menu.classList.remove('animate__slideOutLeft');

    menu.classList.add('animate__animated');
    menu.classList.add('animate__slideInLeft');
    
     
  }


  function closeHamburger()
  {
    
    off();
    whatsappLogo.removeClass('d-none');
    $('#cant-agregada-mobile').removeClass('d-none')
    burger.classList.add("hamburger");
    burger.classList.remove("ocultar");
    menu.classList.remove('animate__animated');
    menu.classList.remove('animate__slideInLeft');
    menu.classList.add('animate__animated');
    menu.classList.add('animate__slideOutLeft');

    
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }   
    
    carritoBtnMobile.removeClass('carrito-mobile-ocultar');
    $('#flex-nav').removeClass('color-grisOscuro-flexnav');
    

    document.styleSheets[0].removeRule(`body::before { content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    height: ${_docHeight}px;
    z-index: 99; }`, 0);
   

   

  }

  function getStylesheet(sheetName) {
    var stylesheet = document.querySelector('link[href*=' + sheetName + ']')

    if( stylesheet ){
        stylesheet = stylesheet.sheet        
    }

    return stylesheet
}