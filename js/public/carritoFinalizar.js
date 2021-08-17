
let carrito =  '';
let total = 0;
let provincias = '';
const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias';

try {
    carrito = JSON.parse(localStorage.getItem('carrito'));
} catch (error) {
    $('#total-wrapper').html(``);
}

const productUrls = JSON.parse(localStorage.getItem('productsUrls'));




$(document).ready((e) => {   

    
   
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
        
        $('#carrito-list').html(` <li class="w-100 item-carrito d-flex flex-row justify-content-center mb-3 pb-5" >
                                
        <div class="carrito-vacio d-flex flex-column justify-content-center align-items-center">
    
                    <h2 class="">Tu carrito está vacío</h2>
                     <a href="shop.html#visita" class="btn btn-outline-secondary">Visitá nuestra Tienda</a>
                     <img src="./images/iconos/lonely.svg" alt="Triste">  
        
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
    
                <li class="item-carrito d-flex flex-row justify-content-between mb-3 pb-5" id="product-li-${producto.uid}">
                                        <div class="img-wrapper">
                                            <img src="${productoUrl}" alt="Sillon">
                                        </div>
                                        <div class="item-info">
                                            <p class="fw-bold fs-5 ps-4 mb-1">${productoCarrito.nombre}</p>
                                            <p class="fs-6 ps-4 text-dark mb-0">${productoCarrito.description}</p>
                                            <p class="fs-6 ps-4 text-secondary">Cantidad disponible: ${productoCarrito.cantidad}</p>
                                            <a href="javascript:void(0)" id="eliminar-carrito" onclick="eliminarDelCarrito('${producto.uid}')" class="ps-4">Eliminar</a>                                    
                                        </div>
                                        <div class="quantity-wrapper ms-5 d-flex flex-row justify-content-center align-items-center">
    
                                            <a href="javascript:void(0)" class="minus-quantity" id="minus-${producto.uid}"> <i class="w-100 h-100 fas fa-minus w-25  text-center"></i></a>                                                       
                                            <p class="input-quantity fs-5 fw-bold ps-3 pe-3 mb-0 w-25  text-center" id="quantity-${producto.uid}">1</p>                                  
                                            <a href="javascript:void(0)" class="add-quantity ps-2" id="add-${producto.uid}"><i class="w-100 h-100 fas fa-plus w-25 text-center "></i></a>      
    
                                        </div>
                                        <div class="price-wrapper d-flex flex-column">
                                            <p class="precio-sin-descuento "><strong> 15% </strong> $ ${productoCarrito.precio + (productoCarrito.precio * 0.15)}</p>
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
                    <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                                        <div class="me-2">
                                            <p class="fs-5 fw-bold m-0">Total con envío</p>  
                                        </div>
                                        <div>
                                            <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                                        </div>
                     </div>
                     <div class="d-flex flex-row justify-content-end align-items-center">
                            <a class="btn btn-primary mb-3 me-1" href="javascript:void(0)" id="finalizar-compra">Finalizar Compra</a>
                     </div>`
                    );
                    $('#btnEnvio').click((e) => {

        
                        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
                
                    });
                    
                    validarEnvio();
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
                    <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                                        <div class="me-2">
                                            <p class="fs-5 fw-bold m-0">Total con envío</p>  
                                        </div>
                                        <div>
                                            <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                                        </div>
                     </div>
                     <div class="d-flex flex-row justify-content-end align-items-center">
                            <a class="btn btn-primary mb-3 me-1" href="javascript:void(0)" id="finalizar-compra" >Finalizar Compra</a>
                     </div>`
                    );
                    $('#btnEnvio').click((e) => {

        
                        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                        modalEnvio.show();
                
                    });
                    validarEnvio();
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
        <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                            <div class="me-2">
                                <p class="fs-5 fw-bold m-0">Total con envío</p>  
                            </div>
                            <div>
                                <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                            </div>
         </div>
         <div class="d-flex flex-row justify-content-end align-items-center">
                <a class="btn btn-primary mb-3 me-1" href="javascript:void(0)" id="finalizar-compra" >Finalizar Compra</a>
         </div>`
        );

        $('#btnEnvio').click((e) => {

        
            var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
            modalEnvio.show();
    
        });
    }    
     
    validarEnvio();
})

function buscarURL(uid)
{
    for (const url of productUrls) {
        if (uid == url.uid) {
            return url.url;
        }
    }
}

function validarEnvio()
{
    $('#finalizar-compra').click((e) => {

        let nombreCargado =  $(`#input-nombre`);
        let apellidoCargado =  $(`#input-apellido`);
        let codigoPostalCargado =  $(`#input-codigoPostal`);
        let localidadCargado =  $(`#input-localidad`);
        let calleCargado =  $(`#input-calle`);
        let numeroCalleCargado =  $(`#input-numeroCalle`);
        let provincia =  $(`#input-provincia`);

        // Para validar la provincia deberia chequear si la opción "pronvincia" contiene el atributo selected

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

            window.location.replace( window.location.host + 'pago');    
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
        $('#carrito-list').html(` <li class="w-100 item-carrito d-flex flex-row justify-content-center mb-3 pb-5" >
                                
        <div class="carrito-vacio d-flex flex-column justify-content-center align-items-center">
    
                    <h2 class="">Tu carrito está vacío</h2>
                     <a href="shop.html#visita" class="btn btn-outline-secondary">Visitá nuestra Tienda</a>
                     <img src="./images/iconos/lonely.svg" alt="Triste">  
        
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
                <div class="total mb-4 w-50 d-flex flex-row justify-content-around align-items-center">
                                    <div class="me-2">
                                        <p class="fs-5 fw-bold m-0">Total con envío</p>  
                                    </div>
                                    <div>
                                        <p class="fs-5 fw-bold m-0">$ ${total},<strong class="fs-6">00</strong> </p>  
                                    </div>
                 </div>
                 <div class="d-flex flex-row justify-content-end align-items-center">
                        <a class="btn btn-primary mb-3 me-1" href="javascript:void(0)" id="finalizar-compra">Finalizar Compra</a>
                 </div>`
                );

                $('#btnEnvio').click((e) => {

        
                    var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
                    modalEnvio.show();
            
                });

                $('#carritoLenght').html(carrito.length);

                validarEnvio();
               

       
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