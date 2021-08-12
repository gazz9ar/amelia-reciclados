// =======================
// FUNCIONALIDADES CARRITO
// =======================

const carritoNumber = document.getElementById("carrito-number");
const notificationWrapper = document.getElementById("notification-wrapper");
let carrito = [];

function agregarCarrito(uid)
{ 
    let existe = false;
    const productsLs = JSON.parse(localStorage.getItem('productsId'));
    let productoSeleccionado = {};

    
        // BUSCAMOS EL PRODUCTO SELECCIONADO, GUARDADO EN EL LOCAL STORAGE
     
    for (const product of productsLs) {
        
        if (product.uid == uid) {

            productoSeleccionado = product;
         

            for (const product of carrito) {

                // ASEGURAMOS QUE EN EL CARRITO NO EXISTA EL PRODUCTO SELECCIONADO

                if (product.uid == uid) {
                    Swal.fire({
                        title: 'Ya agregaste este producto al carrito! \n Ingresa al carrito y elige la cantidad que necesites!',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                      existe = true;
                }
                else {                  
                   
                  
                }
            }
        }
    }  

    if (!existe) {

        carrito.push(productoSeleccionado); 
        
        localStorage.setItem('carrito',JSON.stringify(carrito));
        

    }     


    if (carrito.length == 0) {
        // sigue igual
    } else {

        if (!existe) {


              // Cambio los valores de los campos en la notificacion

              //BUSCO LA URL EN EL LOCAL STORAGE PARA NO CONSULTAR EL BACKEND. ANTERIORMENTE YA SE OBUTVO LA URL AL CARGAR LA PAG.
              let urls = JSON.parse( localStorage.getItem( 'productsUrls' ) );
              let urlSeleccionada = '';
              for (const url of urls) {
                  
                    if (url.uid == uid) {
                        urlSeleccionada = url.url;
                    }
              }
              notificationWrapper.innerHTML = `

                            <p class="fs-5 text-start text-white p-1 mt-0 ps-4 mb-3">Has agregado al carrito:</p>
                            <div class="notification-inner position-relative d-flex flex-column align-items-center">
                                <div class="img-wrapper d-flex justify-content-center align-items-center">
                                    <img src="${urlSeleccionada}" alt="Mueble Agregado al carrito">
                                </div>
                            
                                
                                <p class="fs-6 text-start text-white ps-5 mb-1">${productoSeleccionado.nombre}</p>                                            
                                <p class="fs-6  text-start text-white ps-5 mb-3">Precio: $${productoSeleccionado.precio}</p>
                                <a href="carrito.html"><p class="fs-6 fw-bold text-start text-white ps-5 mb-1">Agregar más Unidades</p></a>   
                            </div>
                        
                  `;

            // Muestro notificación
            notificationWrapper.classList.remove('d-none','animate__fadeOutUp','animate__animated');     
            notificationWrapper.classList.add('d-block','animate__animated', 'animate__fadeInDown');
            


            // Añado numero de articulos en el icono-carrito
            carritoNumber.classList.remove('d-none');
            carritoNumber.classList.add('d-block');
            carritoNumber.innerText = carrito.length;

            // Al pasar 5 segundos se borra la notificacion
            setTimeout(
                function() {
                    notificationWrapper.classList.remove('animate__animated', 'animate__fadeInDown'); 
                    notificationWrapper.classList.add('animate__animated', 'animate__fadeOutUp');
                }, 3000);
        }
        
    }  
}