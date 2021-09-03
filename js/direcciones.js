
let direccionActiva = '';

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
       
        onGetSubCollection('users',user.email,'direccionesEnvio',(querySnapshot) => {

            querySnapshot.forEach((doc) => {

               if (doc.data().active == true) {

                direccionActiva = doc.data();

               } 


               

            })

            console.log(direccionActiva);

        })
        
    } else {
        
    }
})