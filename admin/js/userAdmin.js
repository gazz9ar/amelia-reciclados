const usuarioAdmin = $('#navbarDropdown')



firebase.auth().onAuthStateChanged((user) => {usuarioAdmin.text(user.email);})
