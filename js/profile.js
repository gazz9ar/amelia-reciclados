let provincias = '';
const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias';
const btnGuardar = $('#guardarCambiosPerfil')
let usuarioLogeado = ''

const inputNickname =  $('#nickname');
const inputNombre =  $('#nombre');
const inputApellido =  $('#apellido');
const inputCiudad =  $('#ciudad');
const inputTelefono =  $('#telefono');
const inputProvincia =  $('#provincia');
const contentWrapper = $('#content');
const spinner = $('#spinner-z');
 
contentWrapper.addClass('d-none');



$(document).ready(() => {

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


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            usuarioLogeado = user;
          
            getCollection('users',usuarioLogeado.email).then((p) => {

                spinner.addClass('d-none');

                usuarioLogeado = p.data();

                
                inputNickname.val(usuarioLogeado.nick);
                inputNombre.val(usuarioLogeado.nombre) ;
                inputApellido.val(usuarioLogeado.apellido) ;
                inputCiudad.val(usuarioLogeado.ciudad) ;
                inputTelefono.val(usuarioLogeado.telefono);

                contentWrapper.removeClass('d-none');

        
            })
            .catch();
    
        } else {
            usuarioLogeado = '';
           
        }
    })

    
    

   

    btnGuardar.click(()=> {

            saveDocument('users',{
                nick:inputNickname.val(),
                nombre:inputNombre.val(),
                apellido:inputApellido.val(),
                ciudad:inputCiudad.val(),
                telefono:inputTelefono.val(),
                email:usuarioLogeado.email

            },usuarioLogeado.email).then((e) => {
                Swal.fire(
                    'Confirmado!',
                    'Se han guardado los cambios',
                    'success'
                  )
            })
            .catch((e) => {
                console.log(e);
            });
            
    });

});