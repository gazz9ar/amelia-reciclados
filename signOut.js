
function signOut()
{
  Swal.fire({
    title: 'Estas seguro?',
    text: "Al aceptar cerarás la sesion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0D6EFD',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, cerrar sesión!'
  }).then( async (result) => {
    if (result.isConfirmed) {
      await  Swal.fire(
        'Correcto!',
        'Has cerrado sesión correctamente',
        'success'
      )

       firebase.auth().signOut().then(() => {
        console.log("Deslogeado");
      }).catch((error) => {
        console.log(error);
      });
    }
  })
   

      
}
