

const carrito = JSON.parse(localStorage.getItem('carrito'));
const productUrls = JSON.parse(localStorage.getItem('productsUrls'));



$(window).ready((e) => {
    
    console.log(carrito.lenght);
    $('#carritoLenght').html(6);
    $('#carrito-list').html('');
    for (const producto of carrito) {

        let productoUrl = buscarURL(producto.uid);       

        $('#carrito-list').append( `
        
            <li class="item-carrito d-flex flex-row justify-content-between mb-3 pb-5">
                                    <div class="img-wrapper">
                                        <img src="${productoUrl}" alt="Sillon">
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

function buscarURL(uid)
{
    for (const url of productUrls) {
        if (uid == url.uid) {
            return url.url;
        }
    }
}


function eliminarDelCarrito(uid)
{    

    for (const producto of carrito) {

        if (uid == producto.uid) {           

            $('#carrito-list').html('');
            carrito.pop();
            JSON.stringify(localStorage.setItem('carrito',carrito)) ;
            $('#carritoLenght').html(carrito.lenght);
            
            for (const producto of carrito) {

                let productoUrl = buscarURL(producto.uid);       
        
                $('#carrito-list').append( `
                
                    <li class="item-carrito d-flex flex-row justify-content-between mb-3 pb-5">
                                            <div class="img-wrapper">
                                                <img src="${productoUrl}" alt="Sillon">
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
        }
        else 
        {
         
        }
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