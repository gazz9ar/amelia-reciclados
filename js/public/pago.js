

let carrito = '';
try {
     carrito = JSON.parse(localStorage.getItem('carrito'));
} catch (error) {
    window.location.replace('shop.html'); 
}


const total = localStorage.getItem('totalPago');

let storageRef = '';
let file = ''; 
let pago = {};

const comprobante = $('#comprobante');


$(document).ready(

    $('#total-pago').html('$' + total)
    

    
);

$(document).ready(

        $('#finalizar-compra').click(
            (e) => {

                if (storageRef === '' || comprobante.value == '' )
                {
                    comprobante.addClass('border-danger');
                    comprobante.addClass('border');
                } else 
                {
                    comprobante.removeClass('border-danger');
                    comprobante.removeClass('border');

                    let task = storageRef.put(file); 

                    task.on('state_changed', 

                    function progress(snapshot) {
                    
                        let percentage = (snapshot.bytesTransferred /
                        snapshot.totalBytes) * 100;

                        // FUNCION QUE SE VA EJECUTANDO HASTA COMIPLETAR EL TOTAL DE BYTES

                    },
                    function error(err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `Hubo un error al subir la imagen! ${err}` 
                          })
                    },
                    async function complete() {
                      
                        Swal.fire(
                            'Completo',
                            'Has realizado una compra exitosamente!',
                            'success'
                          );
                        let contenidoAlFinalizar = $('#content-center');

                        contenidoAlFinalizar.removeClass('flex-row');
                        contenidoAlFinalizar.addClass('flex-column');

                        contenidoAlFinalizar.html(`
                        
                        <h1 class="fs-3 fw-bold mt-3 mb-5 compra-finalizada-title text-center" >Compra finalizada</h1>

                    <img src="./images/finalizacion.svg" class="img-tilde" alt="Compra Finalizada">

                    <p class="fs-5 mt-2  text-secondary text-center" style="margin-bottom: 0px;">  Su pedido sera enviado pronto </p>
                    
                    <p class="fs-5  mb-3 text-secondary text-center">Gracias por elegirnos!</p>

                    <a href="shop.html" class="btn btn-volver-tienda">Volver a la tienda</a>
    
                        

                          
                        `);

                            
                        $('#finalizar-compra-mobile').remove();
                                            
                        
                        localStorage.setItem('carrito',[]);

                        // =========================
                        // GUARDO EL PAGO EN LA BBDD
                        // =========================
                        var today = new Date();

                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        
                        firebase.auth().onAuthStateChanged((user) => {
                            if (user) {

                              // SI HAY USUARIO GUARDO EL EMAIL     

                              pago = new Pago(2,
                                total,
                                file.name,
                                user.email,
                                date);

                                saveDocument('pagos',{id:2,
                                    total:total,
                                    urlPago:file.name,
                                    userEmail:user.email,
                                    date}).then((e) => {
                                    console.log(e);
                                  }).catch((err) => {console.log(err)});
                             

                            } else {

                                // SI NO ESTA LOGEADO, se le pedirá un correo electronico

                                console.log('USUARIO NO LOGEADO!!');
                            }
                          });
                          
                          
                     
                          
                    });
                }


            }
        )
       
        
    
         
 );

 $('#finalizar-compra-mobile').click(
    (e) => {

        if (storageRef === '' || comprobante.value == '' )
        {
            comprobante.addClass('border-danger');
            comprobante.addClass('border');
        } else 
        {
            comprobante.removeClass('border-danger');
            comprobante.removeClass('border');

            let task = storageRef.put(file); 

            task.on('state_changed', 

            function progress(snapshot) {
            
                let percentage = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;

                // FUNCION QUE SE VA EJECUTANDO HASTA COMIPLETAR EL TOTAL DE BYTES

            },
            function error(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Hubo un error al subir la imagen! ${err}` 
                  })
            },
            async function complete() {
              
                Swal.fire(
                    'Completo',
                    'Has realizado una compra exitosamente!',
                    'success'
                  );
                let contenidoAlFinalizar = $('#content-center');

                contenidoAlFinalizar.removeClass('flex-row');
                contenidoAlFinalizar.addClass('flex-column');

                contenidoAlFinalizar.html(`
                
                    <h1 class="fs-3 fw-bold mt-3 mb-5 compra-finalizada-title text-center" >Compra finalizada</h1>

                    <img src="./images/finalizacion.svg" class="img-tilde" alt="Compra Finalizada">

                    <p class="fs-5 mt-2 pb-1  text-secondary text-center">  Su pedido sera enviado pronto </p>
                    
                    <p class="fs-5  mb-3 text-secondary text-center">Gracias por elegirnos!</p>

                    <a href="shop.html" class="btn btn-volver-tienda">Volver a la tienda</a>

                    

                  
                `);

                $('#finalizar-compra-mobile').remove();

                                     
                
                localStorage.setItem('carrito',[]);

                // =========================
                // GUARDO EL PAGO EN LA BBDD
                // =========================
                var today = new Date();

                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {

                      // SI HAY USUARIO GUARDO EL EMAIL     

                      pago = new Pago(2,
                        total,
                        file.name,
                        user.email,
                        date);

                        saveDocument('pagos',{id:2,
                            total:total,
                            urlPago:file.name,
                            userEmail:user.email,
                            date}).then((e) => {
                            console.log(e);
                          }).catch((err) => {console.log(err)});
                     

                    } else {

                        // SI NO ESTA LOGEADO, se le pedirá un correo electronico

                        console.log('USUARIO NO LOGEADO!!');
                    }
                  });
                  
                  
             
                  
            });
        }


    }
)

 // ==============================================================================
 // CUANDO CARGUE UN COMPROBANTE GUARDO EL ARCHIVO Y CREO UNA REFERENCIA A LA RUTA
 // ==============================================================================
 comprobante.change( (e) => {

        //Get file
        file = e.target.files[0];

        // storage ref for comprobantes
        storageRef = firebase.storage().ref('comprobantes/' + file.name); 

 });
    




