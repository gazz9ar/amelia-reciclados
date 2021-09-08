const db = firebase.firestore();


function saveDocument(collection,obj,doc)
{
  return db.collection(collection).doc(doc).set(Object.assign({}, obj));
}
const deleteSubDocument = (collection,doc,collection2,doc2) => {

  db.collection(collection).doc(doc).collection(collection2).doc(doc2).delete().then(() => {
    Swal.fire(
        'Correcto!',
        'Has eliminar el producto',
        'success'
      ) 
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha salido mal!'
          })
    });;

}



function editSubDocument(collection,doc,obj,collection2,idDireccion)
{
  return db.collection(collection).doc(doc).collection(collection2).doc(idDireccion).set(Object.assign({}, obj));
}
function saveSubDocument(collection,doc,obj,collection2)
{
  return db.collection(collection).doc(doc).collection(collection2).doc().set(Object.assign({}, obj));
}



function saveUser(user,email,datosDireccion)
{
  db.collection('users').doc(email).set(Object.assign({}, user))
  return db.collection('users').doc(email).collection('direccionesEnvio').doc().set(Object.assign({}, datosDireccion));
}

function getCollection(collection,doc)
{
    let collectionSelected = db.collection(collection).doc(doc);  
    return collectionSelected.get(); 
}
function getSubCollectionDocument(collection,doc,collection2,doc2)
{
    let collectionSelected = db.collection(collection).doc(doc).collection(collection2).doc(doc2);  
    return collectionSelected.get(); 
}

function getSubCollection(collection,doc,collection2)
{
    let collectionSelected = db.collection(collection).doc(doc).collection(collection2);  
    return collectionSelected.get(); 
}

const onGetCollection = (collection,callback) => {

  const collectionSelected = db.collection(collection);
  collectionSelected.onSnapshot(callback); 

}

const onGetSubCollection = (collection,doc,collection2,callback) => {

  const collectionSelected = db.collection(collection).doc(doc).collection(collection2);
  collectionSelected.onSnapshot(callback); 

}




// ===================
// METODOS DE BUSQUEDA
// ===================


function busqDireccionActiva(collection,doc,collection2) {


  return db.collection(collection).doc(doc).collection(collection2).where('active','==',true).get()
  
}