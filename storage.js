// ====================================
// Elementos para usar firebase storage
// ====================================
const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('fileButton');
const addProducts = document.getElementsByClassName("add-product-input");
const idInput = document.getElementsByClassName("id-input");
let storageRef = '';
let file = ''; 

//storage Ref Generico
let downloadRef = ''

// =====================
//modal añadir producto
// =====================
var modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'), {
    keyboard: false
  }) ;
// =======================================================
//inputs del modal para luego resetearlos al reabrir modal
// =======================================================
let nombreInput = document.getElementById('nombreInput');
let precioInput = document.getElementById('precioInput');
let cantidadInput = document.getElementById('cantidadInput');
let descripcionInput = document.getElementById('descripcionInput');

let productoNuevo = {};



function abrirNuevoModalProducto()
{         
      modalProducto.show();
      nombreInput.value = '';
      fileButton.value = '';
      uploader.value = '';
      precioInput.value = '';
      cantidadInput.value = '';
      descripcionInput.value = '';

       //border danger a todos los campos
       precioInput.classList.remove('border');
       precioInput.classList.remove('border-danger');

       nombreInput.classList.remove('border');
       nombreInput.classList.remove('border-danger');

       cantidadInput.classList.remove('border');
       cantidadInput.classList.remove('border-danger');

       descripcionInput.classList.remove('border');
       descripcionInput.classList.remove('border-danger');

}
function cerrarNuevoModalProducto()
{   
      modalProducto.hide();
      
}
fileButton.addEventListener('change', function(e) {

    //Get file
    file = e.target.files[0];

    //Create a storage ref
     storageRef = firebase.storage().ref('shopImages/' + file.name); 
 
})



// =====================
// AÑADIR NUEVO PRODUCTO
// =====================

function saveProduct()
{
    if (storageRef === '' || fileButton.value == '' ) {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has seleccionado ninguna imagen!'
          });


          fileButton.classList.add('border');
          fileButton.classList.add('border-danger');

    } else if(precioInput.value == '' || nombreInput.value == '' || cantidadInput.value == '' || descripcionInput.value == '')  //verifico que no haya campos vacios
    {
        fileButton.classList.remove('border');
        fileButton.classList.remove('border-danger');
        for (const input of addProducts) {
            
            console.log(input);
            if (input.value == '') {
                
                input.classList.add('border');
                input.classList.add('border-danger');

            } else {
                input.classList.remove('border');
                input.classList.remove('border-danger');
            }
        }
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Completa todos los campos!'
          })
    }
    
    else {

        //Upload the file
        let task = storageRef.put(file);    

       //Update the progress bar
        task.on('state_changed',

            function progress(snapshot) {
                
                let percentage = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Hubo un error al subir la imagen! ${err}` 
                  })
            },
            function complete() {
              
                Swal.fire(
                    'Completo',
                    'Has registrado el nuevo producto correctamente!',
                    'success'
                  )
                  cerrarNuevoModalProducto();
                  
            }
         );

         //AGREGO NUEVO PRODUCTO
         var today = new Date();
         var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         productoNuevo = new Producto(idInput.value,nombreInput.value,precioInput.value,cantidadInput.value,date);
         // Add a new document in collection "cities"
         saveDocument('products',productoNuevo)        
        .then(() => {
            // no hago nada, muestro la alerta antes, al resolver la promesa de subir la imagen a la BD
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
              });
        });

        tablaStock.innerHTML = '';
     }       
    
}