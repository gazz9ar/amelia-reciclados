
function signOut()
{
  Swal.fire({
    title: 'Estas seguro?',
    text: "Al aceptar cerarás la sesion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then( async (result) => {
    if (result.isConfirmed) {
      await  Swal.fire(
        'Adios!',
        'Has cerrado sesión correctamente.',
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
