import {Producto,Usuario} from './clasesTienda.js'

const db = firebase.firestore();

const onGetCollection = (collection,callback) => {

    const collectionSelected = db.collection(collection);
    collectionSelected.onSnapshot(callback); 
  
  }
// ==================================
// Obtener una coleccion de firestore
// ==================================
function getCollection(collection)
{
    let collectionSelected = db.collection(collection);  
    return collectionSelected.get(); 
}


/* FUNCION PARA AGREGAR NUEVO documento a X coleccion */
const saveDocument = (collection,obj) => {

    // =================================================================================
    // Se usa Object.assign ya que firestore no reconoce un objeto de tipo personalizado
    // =================================================================================
    db.collection(collection).doc().set(Object.assign({}, obj));
}




//Obtengo los productos de la BD al cargar la ventana

let producto1 = new Producto(1,'Mueble Prueba!',1000,1,'07/13/2021');


window.addEventListener('DOMContentLoaded', async (e) => {

  onGetCollection('products',(querySnapshot => {

    querySnapshot.forEach(
      (doc) => {
        let uid = doc.id;
        let product = doc.data();
        
        console.log(product.nombre);
  
      }
    );
  
  }))
  
})

