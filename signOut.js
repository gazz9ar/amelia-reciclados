
function signOut()

{
    firebase.auth().signOut().then(() => {
        console.log("Deslogeado");
      }).catch((error) => {
        console.log(error);
      });
}
