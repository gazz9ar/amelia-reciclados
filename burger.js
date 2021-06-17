/* BOTON menu hamburgesa mobile */
function OpenCloseHamburger() {

    let menu = document.getElementById("hamburger-menu");
    let burger = document.getElementById("burger");

    // AÑADO FONDO OSCURO
    document.styleSheets[0].insertRule(`section::after { content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    height: 5074px;
    z-index: 99; }`, 0);

    // AÑADO CUANDO HAGA FOCUS FUERA DEL MENU SE CIERRE
    

    burger.classList.remove("hamburger");
    burger.classList.add("ocultar");

    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }    
     
  }


  function closeHamburger()
  {
    let burger = document.getElementById("burger");
    let menu = document.getElementById("hamburger-menu");

    burger.classList.add("hamburger");
    burger.classList.remove("ocultar");
    menu.style.display = "none";

    document.styleSheets[0].removeRule(`section::after { content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    height: 5074px;
    z-index: 99; }`, 0);

    let styleSheet = getStylesheet("./css/styles.css");

    styleSheet.removeRule();

    for (let i=0; i<styleSheet.cssRules.length; i++) {
      if (styleSheet.cssRules[i].selectorText === 'section::after') {        
         
          sheet.deleteRule (i);
      }
  }  

  }

  function getStylesheet(sheetName) {
    var stylesheet = document.querySelector('link[href*=' + sheetName + ']')

    if( stylesheet ){
        stylesheet = stylesheet.sheet        
    }

    return stylesheet
}