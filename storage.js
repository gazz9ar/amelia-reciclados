// ====================================
// Elementos para usar firebase storage
// ====================================
let uploader = document.getElementById('uploader');
let fileButton = document.getElementById('fileButton');
let storageRef = '';
let file = '';

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



function abrirNuevoModalProducto()
{         
      modalProducto.show();
      nombreInput.value = '';
      fileButton.value = '';
      uploader.value = '';
      precioInput.value = '';
      cantidadInput.value = '';
      descripcionInput.value = '';

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

function saveProduct()
{
    if (storageRef === '') {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has seleccionado ninguna imagen!'
          })
    } else {

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
    }       
    
}