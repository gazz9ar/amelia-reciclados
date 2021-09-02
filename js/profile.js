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
                $('#correo-perfil').html(usuarioLogeado.email);
                $('#nombre-perfil').html(usuarioLogeado.nombre + " " + usuarioLogeado.apellido);

                contentWrapper.removeClass('d-none');


                if ($('#nickname').val() == '') {
                    $('#label-nickname').addClass('text-white');
                }
                else {
                    $('#label-nickname').removeClass('text-white');
                }
                 
                $('#nickname').on('keyup', function() {
                
                    if ($('#nickname').val() == '') {
                        
                        $('#label-nickname').addClass('text-white');
                    }
                    else 
                    {
                        $('#label-nickname').removeClass('text-white');
                    }
                
                    
                });
                
                
                // NOMBRE INPUT
                if ($('#nombre').val() == '') {
                    $('#label-nombre').addClass('text-white');
                }else {
                    $('#label-nombre').removeClass('text-white');
                }
                $('#nombre').on('keyup', function() {
                
                    if ($('#nombre').val() == '') {
                        
                        $('#label-nombre').addClass('text-white');
                    }
                    else 
                    {
                        $('#label-nombre').removeClass('text-white');
                    }
                
                    
                });
                
                // APELLIDO INPUT
                if ($('#apellido').val() == '') {
                    $('#label-apellido').addClass('text-white');
                }else {
                    $('#label-apellido').removeClass('text-white');
                }
                $('#apellido').on('keyup', function() {
                
                    if ($('#apellido').val() == '') {
                        
                        $('#label-apellido').addClass('text-white');
                    }
                    else 
                    {
                        $('#label-apellido').removeClass('text-white');
                    }
                
                    
                });
                
                // TELEFONO INPUT
                if ($('#telefono').val() == '') {
                    $('#label-telefono').addClass('text-white');
                }else {
                    $('#label-telefono').removeClass('text-white');
                }
                $('#telefono').on('keyup', function() {
                
                    if ($('#telefono').val() == '') {
                        
                        $('#label-telefono').addClass('text-white');
                    }
                    else 
                    {
                        $('#label-telefono').removeClass('text-white');
                    }
                
                    
                });

                

        
            })
            .catch((e) => {});
    
        } else {
            usuarioLogeado = '';


            $('#spinner-z').remove();

            $('#content').removeClass('d-none');

            $('#content').html(`
            
             <p class="fs-4 fw-bold mt-5 mb-5">Por favor inicia sesión / registrate para ver tu perfil</p>

             <a class="btn btn-amelia w-100 mt-5" href="login.html">Registrarse</a>
             <a class="btn btn-amelia w-100 mt-5" href="login.html">Iniciar Sesión</a>

             
            
            `);
            

           
        }
    })

    
    

   

    btnGuardar.click(()=> {

            saveDocument('users',{
                nick:inputNickname.val(),
                nombre:inputNombre.val(),
                apellido:inputApellido.val(),
                
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