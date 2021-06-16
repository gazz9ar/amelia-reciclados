/* BOTON menu hamburgesa mobile */
function OpenCloseHamburger() {

    let menu = document.getElementById("hamburger-menu");
    let burger = document.getElementById("burger");

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

    burger.style.display === "block";
    

  }