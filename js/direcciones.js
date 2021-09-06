
let datosDireccionActiva = '';
let direccionAmodificar = '';







firebase.auth().onAuthStateChanged((user) => {

    if (user) {

        $('#nueva-direccion').click((e) => {

            $('#guardar-direccion').unbind('click')

            $('#guardar-direccion').text('Guardar')


            $(`#input-nombre`).val('');
           $(`#input-apellido`).val('');
             $(`#input-codigoPostal`).val('');
            $(`#input-localidad`).val('');
            $(`#input-calle`).val('');
            $(`#input-numeroCalle`).val('');                
             $(`#input-provincia`).val('');
            $(`#input-dpto`).val('');
            $(`#input-infoAdicional`).val('');  

            var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'),{
                keyboard: false
              })
        
            modalEnvio.show();


            $('#guardar-direccion').click((e) => {

                let nombreCargado =  $(`#input-nombre`).val();
                let apellidoCargado =  $(`#input-apellido`).val();
                let codigoPostalCargado =  $(`#input-codigoPostal`).val();
                let localidadCargado =  $(`#input-localidad`).val();
                let calleCargado =  $(`#input-calle`).val();
                let numeroCalleCargado =  $(`#input-numeroCalle`).val();                
                let provinciaCargada =  $(`#input-provincia`).val();
                let dptoCargado =  $(`#input-dpto`).val();
                let infoCargada =  $(`#input-infoAdicional`).val();               

                    let direccionCargada = {
                        nombre: nombreCargado,
                        apellido:apellidoCargado,
                        localidad:localidadCargado,
                        calle:calleCargado,
                        numeroCalle:numeroCalleCargado,
                        provincia:provinciaCargada,
                        codPostal:codigoPostalCargado,
                        dpto:dptoCargado,
                        infoAdicional:infoCargada,    
                        active:false                    
                    }

                    saveSubDocument('users',user.email,direccionCargada,'direccionesEnvio')

            })
        });

        
       
        onGetSubCollection('users',user.email,'direccionesEnvio',(querySnapshot) => {

            $('#direcciones').html('');

            

            

            querySnapshot.forEach((doc) => {

                let datosDireccion = doc.data();

               
               if (datosDireccion.active === true) {

                datosDireccionActiva = datosDireccion;
                datosDireccionActiva.id = doc.id;

                if (datosDireccionActiva.nombre == '') {
                    datosDireccionActiva.nombre = 'Anónimo Amelia'
                }
                if (datosDireccionActiva.calle == "") {
                    datosDireccionActiva.calle = 'Calle'
                }
                if (datosDireccionActiva.numeroCalle == "") {
                    datosDireccionActiva.numeroCalle = '123'
                }
                if (datosDireccionActiva.localidad == "") {
                    datosDireccionActiva.localidad = 'Localidad'
                }
                if (datosDireccionActiva.provincia == "") {
                    datosDireccionActiva.provincia = 'Provincia'
                }

                

                $('#direcciones').append(`

               <div class="form-check mb-2" ">
                    <input class="form-check-input text-secondary" type="radio" name="check-${doc.id}" checked id="check-${doc.id}" >
                    <label class="form-check-label" for="check-${doc.id}">
                        Utilizar como dirección de envío
                    </label>
                </div>

                <div class="envio-wrapper mostrar-desktop d-flex flex-column" id="envio-wrapper-${doc.id}">
                        <div class="nombre-wrapper nombre-wrapper-desktop" id="nombre-wrapper-${doc.id}">
                            <p class="fs-6 fw-bold" id="nombre-envio">${datosDireccionActiva.nombre + " " +datosDireccionActiva.apellido}</p>
                            <div>
                                <a href="javascript:void(0)" id="btn-editar-envio-${datosDireccionActiva.id}"><i class="far fa-edit lapiz font-primary"></i></a>
                                <a href="javascript:void(0)" id="btn-eliminar-envio-${datosDireccionActiva.id}"><i class="far fa-times-circle delete-envio"></i></a> 
                            </div>
                            
                        </div>
                        <div class="datos-wrapper datos-wrapper-desktop">
                            <p class="fs-6 text-secondary"> <span id="domicilio">${datosDireccionActiva.calle + " " + datosDireccionActiva.numeroCalle},</span>  <span id="ciudad">${datosDireccionActiva.localidad},</span> 
                                <span id="provincia">${datosDireccionActiva.provincia},</span>  <span id="pais"> Argentina</span> </p>
                        </div>
                    </div>
               
               `);


               // AL TERMINAR DE RENDERIZAR, ASIGNO A CADA BTN-EDITAR Y BTN-ELIMINAR SUS CLICKS
               $(`#btn-editar-envio-${doc.id}`).click((e) => {

                $('#guardar-direccion').unbind('click')

                var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'),{
                    keyboard: false
                })
            
                modalEnvio.show();
    
                $('#guardar-direccion').text('Editar')
    
                
                direccionAmodificar = doc.id
    
                getSubCollectionDocument('users',user.email,'direccionesEnvio',direccionAmodificar).then(
    
                    (e) => {
                        
                        if (e.data().active == false) {
                            $(`#check-${doc.id}`).prop("checked", false);
                        } else {
                            $(`#check-${doc.id}`).prop("checked", true);
                        }
                        
                        $(`#input-nombre`).val(e.data().nombre)  ; 
                        $(`#input-apellido`).val(e.data().apellido)  ;
                        $(`#input-codigoPostal`).val(e.data().codPostal)  ;
                        $(`#input-localidad`).val(e.data().localidad)  ;
                        $(`#input-calle`).val(e.data().calle)  ;
                        $(`#input-numeroCalle`).val(e.data().numeroCalle)  ;                
                        $(`#input-provincia`).val(e.data().provincia)  ;
                        $(`#input-dpto`).val(e.data().dpto)  ;
                        $(`#input-infoAdicional`).val(e.data().infoAdicional);  
    
                    }
                ).catch()
    
    
                $('#guardar-direccion').click((e) => {
    
                    let nombreCargado =  $(`#input-nombre`).val();
                    let apellidoCargado =  $(`#input-apellido`).val();
                    let codigoPostalCargado =  $(`#input-codigoPostal`).val();
                    let localidadCargado =  $(`#input-localidad`).val();
                    let calleCargado =  $(`#input-calle`).val();
                    let numeroCalleCargado =  $(`#input-numeroCalle`).val();                
                    let provinciaCargada =  $(`#input-provincia`).val();
                    let dptoCargado =  $(`#input-dpto`).val();
                    let infoCargada =  $(`#input-infoAdicional`).val();               
    
                        let direccionCargada = {
                            nombre: nombreCargado,
                            apellido:apellidoCargado,
                            localidad:localidadCargado,
                            calle:calleCargado,
                            numeroCalle:numeroCalleCargado,
                            provincia:provinciaCargada,
                            codPostal:codigoPostalCargado,
                            dpto:dptoCargado,
                            infoAdicional:infoCargada,    
                            active:true                    
                        }
    
                    
                        
                    editSubDocument('users',user.email,direccionCargada,'direccionesEnvio',direccionAmodificar)
                    
                })
                
                })

                $(`#btn-eliminar-envio-${doc.id}`).click((e) => {

                    deleteSubDocument('users',user.email,'direccionesEnvio',doc.id)

                })


               } else {

                $('#direcciones').append(`
                
                <div class="form-check mb-2">
                    <input class="form-check-input text-secondary" type="radio" name="check-${doc.id}"  id="check-${doc.id}">
                    <label class="form-check-label" for="check-${doc.id}">
                        Utilizar como dirección de envío
                    </label>
                </div>

               <div class="envio-wrapper mostrar-desktop d-flex flex-column" id="envio-wrapper-${doc.id}">
                    <div class="nombre-wrapper nombre-wrapper-desktop" id="nombre-wrapper-${doc.id}">
                        <p class="fs-6 fw-bold" id="nombre-envio">${datosDireccion.nombre + " " + datosDireccion.apellido}</p>
                        <div>
                            <a href="javascript:void(0)" id="btn-editar-envio-${doc.id}"><i class="far fa-edit lapiz font-primary"></i></a>
                            <a href="javascript:void(0)" id="btn-eliminar-envio-${doc.id}"><i class="far fa-times-circle delete-envio"></i></a> 
                        </div>
                     
                    </div>
                    <div class="datos-wrapper datos-wrapper-desktop">
                        <p class="fs-6 text-secondary"> <span id="domicilio">${datosDireccion.calle + " " + datosDireccion.numeroCalle},</span>  <span id="ciudad">${datosDireccion.localidad},</span> 
                            <span id="provincia">${datosDireccion.provincia},</span>  <span id="pais"> Argentina</span> </p>
                    </div>
                </div>

                `);

               

                // AL TERMINAR DE RENDERIZAR, ASIGNO A CADA BTN-EDITAR SUS CLICKS
                    $(`#btn-editar-envio-${doc.id}`).click((e) => {

                        $('#guardar-direccion').unbind('click')

                        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'),{
                            keyboard: false
                        })
                    
                        modalEnvio.show();
            
                        $('#guardar-direccion').text('Editar')
                        
                       
                        direccionAmodificar = doc.id
            
                        getSubCollectionDocument('users',user.email,'direccionesEnvio',direccionAmodificar).then(
            
                            (e) => {

                                if (e.data().active == false) {
                                    $(`#check-${doc.id}`).prop("checked", false);
                                } else {
                                    $(`#check-${doc.id}`).prop("checked", true);
                                }
                                
                                $(`#input-nombre`).val(e.data().nombre)  ; 
                                $(`#input-apellido`).val(e.data().apellido)  ;
                                $(`#input-codigoPostal`).val(e.data().codPostal)  ;
                                $(`#input-localidad`).val(e.data().localidad)  ;
                                $(`#input-calle`).val(e.data().calle)  ;
                                $(`#input-numeroCalle`).val(e.data().numeroCalle)  ;                
                                $(`#input-provincia`).val(e.data().provincia)  ;
                                $(`#input-dpto`).val(e.data().dpto)  ;
                                $(`#input-infoAdicional`).val(e.data().infoAdicional);  

                                
                              
            
                            }
                        ).catch()
            
            
                        $('#guardar-direccion').click((e) => {
            
                            let nombreCargado =  $(`#input-nombre`).val();
                            let apellidoCargado =  $(`#input-apellido`).val();
                            let codigoPostalCargado =  $(`#input-codigoPostal`).val();
                            let localidadCargado =  $(`#input-localidad`).val();
                            let calleCargado =  $(`#input-calle`).val();
                            let numeroCalleCargado =  $(`#input-numeroCalle`).val();                
                            let provinciaCargada =  $(`#input-provincia`).val();
                            let dptoCargado =  $(`#input-dpto`).val();
                            let infoCargada =  $(`#input-infoAdicional`).val();   
                            
                            
            
                                let direccionCargada = {
                                    nombre: nombreCargado,
                                    apellido:apellidoCargado,
                                    localidad:localidadCargado,
                                    calle:calleCargado,
                                    numeroCalle:numeroCalleCargado,
                                    provincia:provinciaCargada,
                                    codPostal:codigoPostalCargado,
                                    dpto:dptoCargado,
                                    infoAdicional:infoCargada,    
                                    active:false                    
                                }
            
                            
                                
                            editSubDocument('users',user.email,direccionCargada,'direccionesEnvio',direccionAmodificar)
                            
                        })
                        
                    })

                    $(`#btn-eliminar-envio-${doc.id}`).click((e) => {

                        deleteSubDocument('users',user.email,'direccionesEnvio',doc.id)
    
                    })
               }
               
               
            
            
            })

               
               

               

               

        })
        
    } else {
        
    }
})