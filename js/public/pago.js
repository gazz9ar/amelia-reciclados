

let carrito = '';
try {
     carrito = JSON.parse(localStorage.getItem('carrito'));
} catch (error) {
    window.location.replace('http://127.0.0.1:5500/shop.html');
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
                        
                            <h1 class="fs-3 fw-bold mt-3 mb-5" >Gracias por tu compra!</h1>

                            <img src="./images/iconos/comprobado.svg" alt="Compra exitosa" class="img-tilde">

                            <p class="fs-4 mt-2 mb-3">  Has comprado: </p>

                            <ul id="lista-compra" class="list-group">
                                                                                       
                            </ul>

                          
                        `);

                        for (const item of carrito) {
                            
                            $('#lista-compra').append(`
                            
                                <li class="list-group-item">${item.nombre}</li>
                            `);
                        }
                        $('#lista-compra').append(`
                            
                        <p class="fw-bold"> Pronto nos contactaremos contigo via correo electronico para enviarte tu código de seguimiento!</p>
                          `);                          
                        
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

 // ==============================================================================
 // CUANDO CARGUE UN COMPROBANTE GUARDO EL ARCHIVO Y CREO UNA REFERENCIA A LA RUTA
 // ==============================================================================
 comprobante.change( (e) => {

        //Get file
        file = e.target.files[0];

        // storage ref for comprobantes
        storageRef = firebase.storage().ref('comprobantes/' + file.name); 

 });
    




