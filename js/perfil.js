// Cambios en el burger
$('#carrito-mobile-wrapper').addClass('d-none')
$('#amelia-logo').html('Mi perfil')


// ===============
// Efecto a inputs
// ===============
// NICKNAME INPUT


$(document).ready((e ) => { 


    $('#btn-editar-envio').click((e) => {

        
        var modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'))
        modalEnvio.show();

    });
})


$('#perfil-wrapper').click((e) => {

    if (e.target.classList.contains('border-seleccionada')) {

        // SELECCIONA PERFIL PERO YA ESTÁ UBICADO EN PERFIL
    } else {

        // SELECCIONA PERFIL
        $('#perfil-wrapper').addClass('border-seleccionada');

        $('#direcciones-wrapper').removeClass('border-seleccionada');

        $('#content-perfil').removeClass('d-none');

        $('#content-direcciones').addClass('d-none');
    }
})


$('#direcciones-wrapper').click((e) => {

    if (e.target.classList.contains('border-seleccionada')) {

      

        // SELECCIONA DIRECCIONES PERO YA ESTÁ UBICADO EN DIRECCIONES
    } else {

        // SELECCIONA DIRECCIONES
        
        $('#direcciones-wrapper').addClass('border-seleccionada');

        $('#perfil-wrapper').removeClass('border-seleccionada');

        $('#content-perfil').addClass('d-none');

        $('#content-direcciones').removeClass('d-none');


    }
})


function showPlaceholder() {

    if ($('#nickname').val() == '') {
        $('#label-nickname').addClass('text-white');
    }else {      
    }
    if ($('#nombre').val() == '') {
        $('#label-nombre').addClass('text-white');
    }else {      
    }
    if ($('#apellido').val() == '') {
        $('#label-apellido').addClass('text-white');
    }else {      
    }
    if ($('#telefono').val() == '') {
        $('#label-telefono').addClass('text-white');
    }else {      
    }

   
}




