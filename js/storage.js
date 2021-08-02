// ====================================
// Elementos para usar firebase storage
// ====================================



const uploader = document.getElementById('uploader');
const btnAddEdit = document.getElementById('btn-add');
const titleAddEdit = document.getElementById('modalProductoLabel');

const fileButton = document.getElementById('fileButton');
const addProducts = document.getElementsByClassName("add-product-input");
const idInput = document.getElementById("id-input");
let storageRef = '';
let file = ''; 

let productsLocalStorage = JSON.parse(localStorage.getItem('productsId'));
let ultimoProducto = productsLocalStorage.slice(-1);



idInput.setAttribute('placeholder',( ultimoProducto[0].id + 1 ));        
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

let banderaEdit = false;



function abrirNuevoModalProducto(edit)
{        
    if (edit) {
        // PROSIGUE CON LA FUNCION editProduct()
    } else {
        //ABRE EL MODAL VACIO PARA AGREGAR UN NUEVO PRODUCTO
        modalProducto.show();
        nombreInput.value = '';
        fileButton.value = '';
        uploader.value = '';
        precioInput.value = '';
        cantidadInput.value = '';
        descripcionInput.value = '';
        storageRef == '';

        // remove border danger a todos los campos
        precioInput.classList.remove('border');
        precioInput.classList.remove('border-danger');

        nombreInput.classList.remove('border');
        nombreInput.classList.remove('border-danger');

        cantidadInput.classList.remove('border');
        cantidadInput.classList.remove('border-danger');

        descripcionInput.classList.remove('border');
        descripcionInput.classList.remove('border-danger');

        fileButton.classList.remove('border');
        fileButton.classList.remove('border-danger');
    }
      

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

function saveProduct(edit,uid)
{
    if (edit) {
        editSelected(uid);
    }else {
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
                async function complete() {
                  
                    Swal.fire(
                        'Completo',
                        'Has registrado el nuevo producto correctamente!',
                        'success'
                      )
                      cerrarNuevoModalProducto();
                      
                }
             );


             var today = new Date();

             var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                //OBTENGO EL ID DEL ULTIMO PRODUCTO CARGADO Y LE SUMO +1 // AUTO-INCREMENTAL
             
              productoNuevo = new Producto((ultimoProducto[0].id + 1), // ID
                nombreInput.value, // Nombre
                precioInput.value, // Precio
                cantidadInput.value, // Cantidad
                date, // Fecha Al Cargarlo
                file.name, // Url Imagen
                descripcionInput.value); // Descripcion

                // Al entrar al modal para añadir producto la banderaEdit queda en false
                banderaEdit = false;
                idInput.setAttribute('placeholder',( ultimoProducto[0].id + 1 )); 
                btnAddEdit.innerText = 'Agregar';
                btnAddEdit.classList.remove('btn-outline-primary');
                btnAddEdit.classList.add('btn-primary');                 
                btnAddEdit.setAttribute('onclick',`saveProduct(${banderaEdit},'${uid}')` );
                titleAddEdit.innerText = 'Agregar un producto nuevo a la tienda';
                console.log(productoNuevo,products);
                saveDocument('products', productoNuevo, products);  
                    
                
    
            // antes de cerra el modal, reinicio la tabla porque se vuelve a renderizar
            tablaStock.innerHTML = '';
         }       
    }
    
    
}



// ===================
// EDITAR UN PRODUCTO
// ===================


function editProduct(uid)
{
    banderaEdit = true;

    abrirNuevoModalProducto(banderaEdit);
    // ==========================================================================================
    // VALIDACIONES DE ARCHIVOS SELECCIONADOS Y CAMPOS VACIOS // REVISAR ELSE PARA CARGA CORRECTA
    // ==========================================================================================
          
         modalProducto.show();

         let indiceUid = 9999;

         for (let i = 0; i < productsLocalStorage.length; i++) {
                if (productsLocalStorage[i].uid == uid) {
                    indiceUid = i;
                } 
                
            }
         let productToEdit = new Producto( productsLocalStorage[indiceUid].id,
            productsLocalStorage[indiceUid].nombre,
            productsLocalStorage[indiceUid].precio,
            productsLocalStorage[indiceUid].cantidad,
            productsLocalStorage[indiceUid].fechaMs,
            productsLocalStorage[indiceUid].imgUrl,
            productsLocalStorage[indiceUid].description);           
        
            
            nombreInput.value = productToEdit.nombre;
            idInput.value = productToEdit.id;
            uploader.value = '';
            precioInput.value = productToEdit.precio;
            cantidadInput.value = productToEdit.cantidad;
            descripcionInput.value = productToEdit.description;
            // storageRef == '';                
       

            btnAddEdit.innerText = 'Editar';
            btnAddEdit.classList.remove('btn-primary');
            btnAddEdit.classList.add('btn-outline-primary');
             
            btnAddEdit.setAttribute('onclick',`saveProduct(${banderaEdit},'${uid}')` );
            titleAddEdit.innerText = 'Modificar un producto de la tienda';
            
         
}
function editSelected(uid)
{

       
    let indiceUid = 9999;

         for (let i = 0; i < productsLocalStorage.length; i++) {
                if (productsLocalStorage[i].uid == uid) {
                    indiceUid = i;
                } 
                
            }

    let productToEdit = new Producto((idInput.placeholder), // ID
                nombreInput.value, // Nombre
                precioInput.value, // Precio
                cantidadInput.value, // Cantidad
                productsLocalStorage[indiceUid].fechaMs,// Fecha Al Cargarlo
                file.name, // Url Imagen
                descripcionInput.value); // Descripcion       

            
    // EDITO EL PRODUCTO OBTENIDO
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
            async function complete() {
              
                Swal.fire(
                    'Modificacion Correcta!',
                    'Has editado el nuevo producto correctamente!',
                    'success'
                  )
                  cerrarNuevoModalProducto();
                  
            }
         );

         editDocument('products',uid,productToEdit);
         banderaEdit = false;
    }
      
}





// ===================
// ELIMNAR UN PRODUCTO
// ===================
function deleteProduct(uid) {


    Swal.fire({
        title: 'Estas seguro?',
        text: "Al aceptar eliminarás este producto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0D6EFD',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then( async (result) => {
        if (result.isConfirmed) {

            deleteDocument('products',uid);

            

           
        }        
      })

}

