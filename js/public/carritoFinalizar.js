
let carrito =  '';
let total = 0;
let provincias = '';
let usuarioLogeado = '';
const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias';

try {
    carrito = JSON.parse(localStorage.getItem('carrito'));
} catch (error) {
    $('#total-wrapper').html(``);
    console.log(error);
}

const productUrls = JSON.parse(localStorage.getItem('productsUrls'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        usuarioLogeado = user;
       
        validarEnvio(true);

    } else {
        usuarioLogeado = '';
        validarEnvio(false);
    }
})



$(document).ready((e) => {   

    $('#nombre-envio').html('Anónimo');
    $('#domicilio').html('Calle 123');
    $('#ciudad').html('Villa María');
    $('#provincia').html(`Argentina`);
    
    guardarDatosEnvio();

    $('#guardar-datos-envio').click((e) => {

        guardarDatosEnvio();


    });
    $('#btnEnvio').click((e) => {

        
        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
        modalEnvio.show();

    });
    $('#btn-editar-envio').click((e) => {

        
        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
        modalEnvio.show();

    });
    $('#carritoLenght').html(carrito.length);
    $('#carrito-list').html('');

    $.get(urlProvincias,(respuesta, estado) => {

        if (estado == 'success') {

            provincias = respuesta.provincias.sort(Producto.dynamicSort('nombre'));           

            for (const provincia of provincias) {

                $(`#provincias-dropdown`).append(`
                
                <option>${provincia.nombre}</option> 

                `);
            }
        }
    });

    if (carrito.length == 0) {

        $('#items-carrito-wrapper').removeClass('pt-5');
        
        $('#carrito-list').html(` <li class="w-100 item-carrito d-flex flex-row justify-content-center mb-3 pb-5" >
                                
        <div class="carrito-vacio d-flex flex-column justify-content-between align-items-center">
    

                     <img src="./images/carrito-vacio.svg" class="img-tilde" alt="Carrito vacío">  
                    <h2 class="fs-5">Tu carrito está vacío</h2>
                     <a href="shop.html#visita" class="btn btn-volver-tienda">Ir a la tienda</a>
                    
                   
        
        </div>
    
     </li>     `);



     $('#total-wrapper').html(``);
    } else {
        
        // const subtotalesExternos = 0;
        for (const producto of carrito) {

            total += producto.precio;
            let productoUrl = buscarURL(producto.uid);       
            let productoCarrito = new Producto(producto.id,producto.nombre,producto.precio,producto.cantidad,producto.fecha,producto.url,producto.description);
            $('#carrito-list').append( `
    
                <li class="item-carrito d-flex flex-row justify-content-between mb-3 pb-5 position-relative" id="product-li-${producto.uid}">
                                        <div class="position-absolute eliminar-circle-mobile" onclick="eliminarDelCarrito('${producto.uid}')">
                                         <i class="far fa-times-circle"></i>
                                        </div>
                                        <div class="img-wrapper" >
                                            <img src="${productoUrl}" alt="Sillon">
                                        </div>
                                        <div class="item-info">
                                            <p class="fw-bold fs-5 ps-4 mb-1 nombre-producto">${productoCarrito.nombre}</p>
                                            <p class="fs-6 ps-4 text-dark mb-0">${productoCarrito.description}</p>
                                            <p class="fs-6 ps-4 text-secondary">Stock: ${productoCarrito.cantidad}</p>
                                            <div class="d-flex ps-4 flex-row justify-content-start align-items-center quantity-mobile">
                                                <div id="minus-${producto.uid}" class="btn-quantity-mobile">
                                                   <i class="fas fa-minus"></i>
                                                </div>
                                                <p class="input-quantity fs-5 fw-bold ps-3 pe-3 mb-0 w-25 text-center" id="quantity-${producto.uid}">1</p>
                                                <div id="add-${producto.uid}" class="btn-quantity-mobile">
                                                   <i class="fas fa-plus"></i>
                                                </div>
                                            </div>
                                            <a href="javascript:void(0)" id="eliminar-carrito" class="eliminar-btn-carrito" onclick="eliminarDelCarrito('${producto.uid}')" class="ps-4">Eliminar</a>                                    
                                        </div>
                                        <div class="quantity-wrapper ms-5 d-flex flex-row justify-content-center align-items-center">
    
                                            <a href="javascript:void(0)" class="minus-quantity" id="minus-${producto.uid}"> <i class="w-100 font-primary h-100 fas fa-minus w-25  text-center"></i></a>                                                       
                                            <p class="input-quantity fs-5 fw-bold ps-3 pe-3 mb-0 w-25  text-center" id="quantity-${producto.uid}-desktop">1</p>                                  
                                            <a href="javascript:void(0)" class="add-quantity ps-2" id="add-${producto.uid}"><i class="w-100 font-primary h-100 fas fa-plus w-25 text-center "></i></a>      
    
                                        </div>
                                        <div class="price-wrapper d-flex flex-column">
                                            
                                            <p class="precio-final fw-bold fs-5 mb-5" id="subtotal-${producto.uid}">$ ${productoCarrito.precio}</p>
                                        </div>
                                    
                 </li>
            
            
            `);  


            let botonMenos = $(`#product-li-${producto.uid} #minus-${producto.uid}`);
            let botonMas = $(`#product-li-${producto.uid} #add-${producto.uid}`); 


            // ======================================
            // AGREGAMOS EL EVENTO CLICK AL - (menos)
            // ======================================
            $(`#product-li-${producto.uid} #minus-${producto.uid}`).click((e) => {


                

                let contenido =  parseInt($(`#quantity-${producto.uid}`).html());               

                if (contenido === 1 ) {

                    contenido = 1;
                    botonMenos.addClass('minus-quantity-disabled');
                    botonMenos.removeClass('minus-quantity');
                    
                    
                } else {

                    botonMenos.addClass('minus-quantity');
                    botonMenos.removeClass('minus-quantity-disabled');
                    contenido--;  
                    total -= producto.precio;
                    $(`#quantity-${producto.uid}`).html(contenido);
                    $(`#quantity-${producto.uid}-desktop`).html(contenido);
                    // ==================================================================================
                    // MODIFICAMOS SUBTOTAL DE CADA PRODUCTO CADA VEZ QUE CAMBIE LA CANTIDAD SELECCIONADA
                    // ==================================================================================
                    $(`#subtotal-${producto.uid}`).html(`$ ${contenido * producto.precio}`);


                   
                    $('#total-wrapper').html(`
                    <div class="envio border-bottom mb-3 pb-3 w-50 d-flex flex-row justify-content-around align-items-center">
                                        <div>
                                            <button type="button" id="btnEnvio" class="fs-6 fw-bold btn btn-outline-primary text-dark">
                                            Completar datos Envío
                                            </button>
                                        </div>
                                        <div>
                                            <p class="fs-6 mb-0 fw-bold text-success">Envío Gratis</p>
                                        </div>                                
                      </div>
                      <p class="titulo-envio">Datos de Envío</p>
                      <div class="envio-wrapper d-flex flex-column">
                      <div class="nombre-wrapper">
                          <p class="fs-6 fw-bold" id="nombre-envio">Anónimo</p>
                          <a href="javascript:void(0)" id="btn-editar-envio"><i class="far fa-edit lapiz font-primary"></i></a> 
                      </div>
                      <div class="datos-wrapper">
                          <p class="fs-6 text-secondary"> <span id="domicilio">Calle 123,</span>  <span id="ciudad">Villa Maria,</span> 
                           <span id="provincia">Córdoba,</span>  <span id="pais"> Argentina</span> </p>
                      </div>
                </div>
                    <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                                        <div class="me-2">
                                            <p class="fs-5 fw-bold m-0">Total con envío</p>  
                                        </div>
                                        <div>
                                            <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                                        </div>
                     </div>
                     <div class="d-flex flex-row justify-content-end align-items-center btn-envio-wrapper">
                            <a class="btn btn-primary mb-3 me-1 btn-finalizar" href="javascript:void(0)" id="finalizar-compra">Siguiente</a>
                     </div>`
                    );

                    $('#btn-editar-envio').click((e) => {

        
                        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
                
                    });
                    guardarDatosEnvio();
                    

                        validarEnvio(true);
                    
                    if (producto.cantidad !== contenido) {
                        botonMas.addClass('add-quantity');
                        botonMas.removeClass('add-quantity-disabled');
                    } 
                    if (contenido === 1) {
                        botonMenos.addClass('minus-quantity-disabled');
                        botonMenos.removeClass('minus-quantity');
                    }
                }
                

            });

            
             // AGREGAMOS EL EVENTO CLICK AL + (más)
            $(`#product-li-${producto.uid} #add-${producto.uid}`).click((e) => {

                let contenido =  parseInt($(`#quantity-${producto.uid}`).html());                  
                if (producto.cantidad === contenido) {
                  
                    botonMas.addClass('add-quantity-disabled');
                    botonMas.removeClass('add-quantity');
                    
                } else {

                     if (contenido === 1) {
                         contenido = 1;
                         botonMenos.addClass('minus-quantity');
                         botonMenos.removeClass('minus-quantity-disabled');
                     }
                    contenido++;
                    $(`#quantity-${producto.uid}`).html(contenido); 
                    $(`#quantity-${producto.uid}-desktop`).html(contenido);       

                    // ==================================================================================
                    // MODIFICAMOS SUBTOTAL DE CADA PRODUCTO CADA VEZ QUE CAMBIE LA CANTIDAD SELECCIONADA
                    // ==================================================================================
                    
                     $(`#subtotal-${producto.uid}`).html(`$ ${contenido * producto.precio}`);  
                    
                    
                     
                    total += producto.precio;

                    $('#total-wrapper').html(`
                    <div class="envio border-bottom mb-3 pb-3 w-50 d-flex flex-row justify-content-around align-items-center">
                                        <div>
                                            <button type="button" id="btnEnvio" class="fs-6 fw-bold btn btn-outline-primary text-dark">
                                            Completar datos Envío
                                            </button>
                                        </div>
                                        <div>
                                            <p class="fs-6 mb-0 fw-bold text-success">Envío Gratis</p>
                                        </div>                                
                      </div>
                      <p class="titulo-envio">Datos de Envío</p>
                      <div class="envio-wrapper d-flex flex-column">
                        <div class="nombre-wrapper">
                            <p class="fs-6 fw-bold" id="nombre-envio">Anónimo</p>
                            <a href="javascript:void(0)" id="btn-editar-envio"><i class="far fa-edit lapiz font-primary"></i></a> 
                        </div>
                        <div class="datos-wrapper">
                            <p class="fs-6 text-secondary"> <span id="domicilio">Calle 123,</span>  <span id="ciudad">Villa Maria,</span> 
                             <span id="provincia">Córdoba,</span>  <span id="pais"> Argentina</span> </p>
                        </div>
                  </div>
                    <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                                        <div class="me-2">
                                            <p class="fs-5 fw-bold m-0">Total con envío</p>  
                                        </div>
                                        <div>
                                            <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                                        </div>
                     </div>
                     <div class="d-flex flex-row justify-content-end align-items-center btn-envio-wrapper">
                            <a class="btn btn-primary mb-3 me-1 btn-finalizar" href="javascript:void(0)" id="finalizar-compra" >Siguiente</a>
                     </div>`
                    );

                    guardarDatosEnvio();
                    $('#btnEnvio').click((e) => {

        
                        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
                
                    });
                    $('#btn-editar-envio').click((e) => {

        
                        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
                
                    });
                    
                    
                        validarEnvio(true);
                    
                    botonMas.addClass('add-quantity');
                    botonMas.removeClass('add-quantity-disabled');
                    if (producto.cantidad === contenido) {
                        botonMas.addClass('add-quantity-disabled');
                        botonMas.removeClass('add-quantity');
                    }
                    
                      
                }

            
            
            });

            
        }      
        
        
        $('#total-wrapper').html(`
        <div class="envio border-bottom mb-3 pb-3 w-50 d-flex flex-row justify-content-around align-items-center">
                            <div>
                                <button type="button" id="btnEnvio" class="fs-6 fw-bold btn btn-outline-primary text-dark">
                                Completar datos Envío
                                </button>
                            </div>
                            <div>
                                <p class="fs-6 mb-0 fw-bold text-success">Envío Gratis</p>
                            </div>                                
          </div>
          <p class="titulo-envio">Datos de Envío</p>
          <div class="envio-wrapper d-flex flex-column">
                        <div class="nombre-wrapper">
                            <p class="fs-6 fw-bold" id="nombre-envio">Anónimo</p>
                            <a href="javascript:void(0)" id="btn-editar-envio"><i class="far fa-edit lapiz font-primary"></i></a> 
                        </div>
                        <div class="datos-wrapper">
                            <p class="fs-6 text-secondary"> <span id="domicilio">Calle 123,</span>  <span id="ciudad">Villa Maria,</span> 
                             <span id="provincia">Córdoba,</span>  <span id="pais"> Argentina</span> </p>
                        </div>
                  </div>
        <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                            <div class="me-2">
                                <p class="fs-5 fw-bold m-0">Total con envío</p>  
                            </div>
                            <div>
                                <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                            </div>
         </div>
         <div class="d-flex flex-row justify-content-end align-items-center btn-envio-wrapper">
                <a class="btn btn-primary mb-3 me-1 btn-finalizar" href="javascript:void(0)" id="finalizar-compra" >Siguiente</a>
         </div>`
        );

        $('#btnEnvio').click((e) => {

        
            var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
            modalEnvio.show();
    
        });
        $('#btn-editar-envio').click((e) => {

        
            var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
            modalEnvio.show();
    
        });
    }    
     
    
    validarEnvio(true);
    
    
})

function buscarURL(uid)
{
    for (const url of productUrls) {
        if (uid == url.uid) {
            return url.url;
        }
    }
}

 function validarEnvio(user)
{

    let emailCargado =  $(`#input-email`);
    let ingresarEmail =  $(`#ingresarEmail`);
    
    if (user) {
        
        emailCargado.add('d-none');
        ingresarEmail.add('d-none');
    } else {     
    
        emailCargado.removeClass('d-none');
        ingresarEmail.removeClass('d-none');
    }
    
    // ELIMINO EL METODO CLICK PARA AGREGARLO DE NUEVO YA QUE SE EJECUTA **SIEMPRE** Y SE VUELVE A EJECUTAR CUANDO FIREBASE AUTENTICA AL USUARIO
    // LO QUE PROVOCABA QUE EL MODAL SE ABRA 2 VECES AL CLICKEAR "FINALIZAR COMPRA"

    $('#finalizar-compra').unbind('click');
    $('#finalizar-compra').click((e) => {

        let nombreCargado =  $(`#input-nombre`);
        let apellidoCargado =  $(`#input-apellido`);
        let codigoPostalCargado =  $(`#input-codigoPostal`);
        let localidadCargado =  $(`#input-localidad`);
        let calleCargado =  $(`#input-calle`);
        let numeroCalleCargado =  $(`#input-numeroCalle`);
        
        let provincia =  $(`#input-provincia`);

        // Para validar la provincia deberia chequear si la opción "pronvincia" contiene el atributo selected

        if (user) {
            if (nombreCargado.val() == '' || apellidoCargado.val() == '' || codigoPostalCargado.val() == '' || localidadCargado.val() == '' || calleCargado.val() == '' || numeroCalleCargado.val() == '') {
            

                nombreCargado.addClass('border border-danger');
                apellidoCargado.addClass('border border-danger');
                codigoPostalCargado.addClass('border border-danger');
                localidadCargado.addClass('border border-danger');
                calleCargado.addClass('border border-danger');
                numeroCalleCargado.addClass('border border-danger');
    
                if (nombreCargado.val() != '') {
                    nombreCargado.removeClass('border border-danger');
                }
                 if(apellidoCargado.val() != '') {
                    apellidoCargado.removeClass('border border-danger');
                } 
                 if (codigoPostalCargado.val() != '') {
                    codigoPostalCargado.removeClass('border border-danger');
                } 
                 if (localidadCargado.val() != '') {
                    localidadCargado.removeClass('border border-danger');
                } 
                 if (calleCargado.val() != '') {
                    calleCargado.removeClass('border border-danger');
                } 
                 if (numeroCalleCargado.val() != '') {
                    numeroCalleCargado.removeClass('border border-danger');
                }           
    
                var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
    
            } else {
                
                localStorage.setItem('totalPago',total);
    
                window.location.replace('pago.html');    
            }
        
        } else {
            if (nombreCargado.val() == '' || apellidoCargado.val() == '' || codigoPostalCargado.val() == ''
             || localidadCargado.val() == '' || calleCargado.val() == '' || numeroCalleCargado.val() == '' || emailCargado.val() == '') {
            

                nombreCargado.addClass('border border-danger');
                apellidoCargado.addClass('border border-danger');
                codigoPostalCargado.addClass('border border-danger');
                localidadCargado.addClass('border border-danger');
                calleCargado.addClass('border border-danger');
                numeroCalleCargado.addClass('border border-danger');
                emailCargado.addClass('border border-danger');
    
                if (nombreCargado.val() != '') {
                    nombreCargado.removeClass('border border-danger');
                }
                 if(apellidoCargado.val() != '') {
                    apellidoCargado.removeClass('border border-danger');
                } 
                 if (codigoPostalCargado.val() != '') {
                    codigoPostalCargado.removeClass('border border-danger');
                } 
                 if (localidadCargado.val() != '') {
                    localidadCargado.removeClass('border border-danger');
                } 
                 if (calleCargado.val() != '') {
                    calleCargado.removeClass('border border-danger');
                } 
                 if (numeroCalleCargado.val() != '') {
                    numeroCalleCargado.removeClass('border border-danger');
                }           
                if (emailCargado.val() != '') {
                    emailCargado.removeClass('border border-danger');
                }           
                
    
                var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
    
            } else {
                
                localStorage.setItem('totalPago',total);
    
                window.location.replace('pago.html');    
            }
        
        }


       
     });
}


function eliminarDelCarrito(uid)
{    

    carrito = carrito.filter( (p) => p.uid != uid );   
    $(`#product-li-${uid}`).remove(); 
    localStorage.setItem('carrito',JSON.stringify(carrito));
   
    if (carrito.length == 0) {
        
        $('#subtotal').html('');
        $('#total-wrapper').html(``);
        $('#carritoLenght').html(carrito.length);
        $('#items-carrito-wrapper').removeClass('pt-5');
        $('#carrito-list').html(` <li class="w-100 item-carrito d-flex flex-row justify-content-center mb-3 pb-5" >
                                
        <div class="carrito-vacio d-flex flex-column justify-content-between align-items-center">


                      <img src="./images/carrito-vacio.svg" class="img-tilde" alt="Carrito vacío">  
                       <h2 class="fs-6">Tu carrito está vacío</h2>
                     <a href="shop.html#visita" class="btn btn-volver-tienda">Ir a la Tienda</a>                      
                     
        
        </div>
    
     </li>     `);
        
    } else {

        total = 0;
        for (const producto of carrito) {   

                 
                 // CAPTURO LA CANTIDAD ACTUAL SELECCIONADA
                let cantidadSeleccionada = parseInt($(`#quantity-${producto.uid}`).html());
                
                total += (producto.precio * cantidadSeleccionada);
            
        }


        $('#total-wrapper').html(`
                <div class="envio border-bottom mb-3 pb-3 w-50 d-flex flex-row justify-content-around align-items-center">
                                    <div>
                                        <button type="button" id="btnEnvio" class="fs-6 fw-bold btn btn-outline-primary text-dark">
                                        Completar datos Envío
                                        </button>
                                    </div>
                                    <div>
                                        <p class="fs-6 mb-0 fw-bold text-success">Envío Gratis</p>
                                    </div>                                
                  </div>
                  <p class="titulo-envio">Datos de Envío</p>
                  <div class="envio-wrapper d-flex flex-column">
                        <div class="nombre-wrapper">
                            <p class="fs-6 fw-bold" id="nombre-envio">Anónimo</p>
                            <a href="javascript:void(0)" id="btn-editar-envio"><i class="far fa-edit lapiz font-primary"></i></a> 
                        </div>
                        <div class="datos-wrapper">
                            <p class="fs-6 text-secondary"> <span id="domicilio">Calle 123,</span>  <span id="ciudad">Villa Maria,</span> 
                             <span id="provincia">Córdoba,</span>  <span id="pais"> Argentina</span> </p>
                        </div>
                  </div>
                <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                                    <div class="me-2">
                                        <p class="fs-5 fw-bold m-0">Total con envío</p>  
                                    </div>
                                    <div>
                                        <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                                    </div>
                 </div>
                 <div class="d-flex flex-row justify-content-end align-items-center btn-envio-wrapper">
                        <a class="btn btn-primary mb-3 me-1 btn-finalizar" href="javascript:void(0)" id="finalizar-compra">Siguiente</a>
                 </div>`
                );

                $('#btnEnvio').click((e) => {

        
                    var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                    modalEnvio.show();
            
                });
                $('#btn-editar-envio').click((e) => {

        
                    var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                    modalEnvio.show();
            
                });

                $('#carritoLenght').html(carrito.length);

                
                    validarEnvio(true);
                
               

       
    }

    
   
}



// ?????????????????????????????
// HAY QUE PENSARLA MEJOR XDDD!!
// ?????????????????????????????

function addDeleteHtml(id,html,array)
{   
    $(id).html('');
    for (const item of array) {        
           
            $(id).append(html);
    }

}


function guardarDatosEnvio() 
{

    let nombreCargado =  $(`#input-nombre`).val();
    let apellidoCargado =  $(`#input-apellido`).val();
    let codigoPostalCargado =  $(`#input-codigoPostal`).val();
    let localidadCargado =  $(`#input-localidad`).val();
    let calleCargado =  $(`#input-calle`).val();
    let numeroCalleCargado =  $(`#input-numeroCalle`).val();
    let provinciaCargado =  $(`#provincias-dropdown`).val();

    
        $('#nombre-envio').html(`${nombreCargado +  " " + apellidoCargado}`);
        $('#domicilio').html(`${calleCargado + " " + numeroCalleCargado}, `);
        $('#ciudad').html(`${localidadCargado}, `);
        $('#provincia').html(`${provinciaCargado}, `);
    
       



        
}