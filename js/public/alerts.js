


var form = document.getElementById("form-contacto");

var inputs = document.getElementsByClassName("form-control");
    
async function handleSubmit(event) {
  
      event.preventDefault();
      // var status = document.getElementById("my-form-status");
      // console.log(inputs.email.value,inputs.name.value,inputs.mensaje.value);
      if (inputs.email.value == "" || inputs.name.value == "" || inputs.mensaje.value == "")
       {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Complete todo los campos!'
        })
      }
      else  
      {
          var data = new FormData(event.target);
        // console.log(event.target);
        fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
              'Accept': 'application/json'
          }
        }).then(response => {
          Swal.fire(
            'Enviado!',
            'Muchas gracias por tu mensaje, pronto nos contactaremos contigo.',
            'success'
          )
          form.reset()
        }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha salido mal! Intentalo de nuevo'
          })
        });
      }
      


    }


    form.addEventListener("submit", handleSubmit)