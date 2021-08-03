

let carrito = JSON.parse(localStorage.getItem('carrito'));
const productUrls = JSON.parse(localStorage.getItem('productsUrls'));

$(window).ready((e) => {

    $('#carrito-list').html('');
    for (const producto of carrito) {

        let productoUrl = carrito.find( p => { p.uid == 'df98h6d79f8g6fd'})

        

        $('#carrito-list').append( `
        
            <li class="item-carrito d-flex flex-row justify-content-between mb-3 pb-5">
                                    <div class="img-wrapper">
                                        <img src="" alt="Sillon">
                                    </div>
                                    <div class="item-info">
                                        <p class="fw-bold fs-5 ps-4 mb-1">${producto.nombre}</p>
                                        <p class="fs-6 ps-4 text-dark mb-0">${producto.description}</p>
                                        <p class="fs-6 ps-4 text-secondary">Cantidad disponible: ${producto.cantidad}</p>
                                        <a href="javascript:void(0)" onclick="eliminarDelCarrito('${producto.uid}')" class="ps-4">Eliminar</a>                                    
                                    </div>
                                    <div class="quantity-wrapper ms-5 d-flex flex-row justify-content-center align-items-center">

                                        <a href="javascript:void(0)" class="minus-quantity"> <i class="fas fa-minus w-25  text-center"></i></a>                                                       
                                        <p class="input-quantity fs-5 fw-bold ps-3 pe-3 mb-0 w-25  text-center">1</p>                                  
                                        <a href="javascript:void(0)" class="add-quantity ps-2"><i class="fas fa-plus w-25 text-center "></i></a>      

                                    </div>
                                    <div class="price-wrapper d-flex flex-column">
                                        <p class="precio-sin-descuento "><strong> 15% </strong> $ ${producto.precio}</p>
                                        <p class="precio-final fw-bold fs-5 mb-5">$ ${producto.precio * producto.cantidad}</p>
                                    </div>
                                
             </li>
        
        
        `);  
    }


     
})


function eliminarDelCarrito(uid)

{

   const found = carrito.find(p => {p.uid == uid});
    console.log(found);


}