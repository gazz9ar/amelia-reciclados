/* BOTON menu hamburgesa mobile */
function OpenCloseHamburger() {

    let menu = document.getElementById("hamburger-menu");

    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }

    // let burgerNormal = document.getElementById("burger");
    // let burgerMenuAbierto = document.getElementById("burgerMenuAbierto");

    // if(burgerNormal.style === "none" && burgerMenuAbierto.style === "block")
    // {
    //   burgerNormal.style === "block";
    //   burgerMenuAbierto.style === "none";
    // }
    // else if(burgerNormal.style === "block" && burgerMenuAbierto.style === "none")
    // {
    //   burgerNormal.style === "none";
    //   burgerMenuAbierto.style === "block";
    // }
   



    

   

  
  }


  function close()
  {
    let burger = document.getElementById("burger");

    if (burger.style.display === "block") {
      burger.style.display = "none";
    } else {
      burger.style.display = "block";
    }

  }