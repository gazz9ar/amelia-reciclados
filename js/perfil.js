// Cambios en el burger
$('#carrito-mobile-wrapper').addClass('d-none')
$('#amelia-logo').html('Mi perfil')


// ===============
// Efecto a inputs
// ===============
// NICKNAME INPUT



$('#perfil-wrapper').click((e) => {

    if (e.target.classList.contains('border-seleccionada')) {

        // SELECCIONA PERFIL PERO YA ESTÁ UBICADO EN PERFIL
    } else {

        // SELECCIONA PERFIL
        $('#perfil-wrapper').addClass('border-seleccionada');

        $('#direcciones-wrapper').removeClass('border-seleccionada');

        $('#content-change').removeClass('d-none');
    }
})


$('#direcciones-wrapper').click((e) => {

    if (e.target.classList.contains('border-seleccionada')) {

      

        // SELECCIONA DIRECCIONES PERO YA ESTÁ UBICADO EN DIRECCIONES
    } else {

        // SELECCIONA DIRECCIONES
        
        $('#direcciones-wrapper').addClass('border-seleccionada');

        $('#perfil-wrapper').removeClass('border-seleccionada');

        $('#content-change').addClass('d-none');


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




