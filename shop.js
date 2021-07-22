// import {Producto,Usuario} from './clasesTienda.js'


const db = firebase.firestore();

const tablaStock = document.getElementById("con-stock-table");
const imgProduct = document.getElementById("img-product");
const vistaPreviaCantidad = document.getElementById("vista-previa-cantidad");
const vistaPreviaTitle = document.getElementById("vista-previa-title");
const vistaPreviaPrecio = document.getElementById("vista-previa-precio");
const orderGroup = document.getElementById("orderGroup");

//DECLARO ARRAY DE OBJETOS DE PRODUCTO
let products = [ ];


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




function vistaPrevia(uid)
    { 
      
      const collection = db.collection('products');
    
      let docRef = collection.doc(uid);
      
     docRef.get()
     .then((doc) => {

        let productDocument = doc.data();
        if (doc.exists) {
          
          // Obtengo URL de la imagen almacenada en FIRESTORE CLOUD y la muestro
          let storageRef  = firebase.storage().ref();        
                
          storageRef.child('shopImages/' + productDocument.imgUrl).getDownloadURL().then(function(url) {
    
          // Or inserted into an <img> element:          
          
          imgProduct.src = url;
          vistaPreviaCantidad.innerText = `Stock: ${productDocument.cantidad} ` ;
          vistaPreviaPrecio.innerText = `$ ${productDocument.precio}`;
          vistaPreviaTitle.innerText = ` ${productDocument.nombre}`;
    
        });
        } else {
          
          console.log("No such document!");
        }

     })
     .catch((err) => {

      console.log("Error catch: " + err)

     });
    
      
    }


    // =================================================================================
    // Al cargar el panel admin/panelShop  renderizo tabla con productos cargados 
    // =================================================================================

window.addEventListener('DOMContentLoaded', async (e) => {

  onGetCollection('products',(querySnapshot => {

    tablaStock.innerHTML = '';
    tablaStock.innerHTML = `
    <table>
      <thead>
      <tr>
          <th class="border-top-0">Nro</th>
          <th class="border-top-0">Nombre</th>
          <th class="border-top-0">Fecha Publicación</th>
          <th class="border-top-0">Precio</th>
          <th class="border-top-0">Cantidad</th>
          <th class="border-top-0">Editar/Eliminar</th>
      </tr>
      </thead>     

    </table> `;
    
    querySnapshot.forEach(
      (doc) => {

        //DEBERIA GUARDAR EL UID EN LOCAL STORAGE PARA CUANDO ORDENE EL ARRAY Y RENDERIZE NUEVAMENTE NO SE PIERDA
        
        let uid = doc.id;
        let product = doc.data();        
        
        products.push(product);
        

        tablaStock.innerHTML += `
        
        <tbody>
            <tr id="product-id-${product.id}">
            <td style="width:50px;" class="fs-4" >${product.id}</td>
            <td class="align-middle">
                <p>${product.nombre}}</p>
            </td>
            <td class="align-middle">${Date.parse(product.fecha)}</td>
            <td class="align-middle">${product.precio}</td>
            <td class="align-middle">${product.cantidad}</td>            
            <td class="align-middle ps-3">
                <a href="#"  class="me-2 ms-2"><i
                        class="icon-edit fs-3 far fa-edit"></i></a>
                <a href="#" class="me-2"><i
                        class="text-danger icon-delete fs-3 far fa-trash-alt"></i></a>
                <a href="javascript:void(0)" data-bs-toggle="modal" onclick="vistaPrevia('${uid}')"
                data-bs-target="#modalVistaPrevia" type="button"><i
                        class="text-secondary icon-view fs-3 fas fa-eye"></i></a>
            </td>
            </tr>
        </tbody>
        `      


       

      }
    );
    
    
   
  }))
  
})



    // =====================================================================
    // Metodo para ordenar y renderizar los productos   
    // =====================================================================
const orderOptions = document.querySelector('.order-options-select');


// Escucho a las selecciones en el ordenamiento
orderOptions.addEventListener('change', (e) => {

    
    // capturo el <select></select>
    let options = e.target;

    //recorro las opciones del <select></select>
    for (const option of options) {
      
        // pregunto cual es el <option></option> seleccionado y llamo al metodo para ordenar los productos
        if (option.selected) {
          if (option.innerText == 'Precio') {
            orderProducts('precio');
          } else if (option.innerText == 'Unidades') {
            orderProducts('cantidad');
          } else {
            orderProducts('id');
          }          
          
        } 
        
    }  
  
    

})

function orderProducts(property)
{

  let arrayOrdenado = products.sort(Producto.dynamicSort(property));

  tablaStock.innerHTML = '';
  tablaStock.innerHTML = `
    <table>
      <thead>
      <tr>
          <th class="border-top-0">Nro</th>
          <th class="border-top-0">Nombre</th>
          <th class="border-top-0">Fecha Publicación</th>
          <th class="border-top-0">Precio</th>
          <th class="border-top-0">Cantidad</th>
          <th class="border-top-0">Editar/Eliminar</th>
      </tr>
      </thead>     

    </table> `;


    for (let i = 0; i < arrayOrdenado.length; i++) {
      
      tablaStock.innerHTML += `
        
      <tbody>
          <tr id="product-id-${i}">
          <td style="width:50px;" class="fs-4" >${i}</td>
          <td class="align-middle">
              <p>${arrayOrdenado[i].nombre}}</p>
          </td>
          <td class="align-middle">${Date.parse(arrayOrdenado[i].fecha)}</td>
          <td class="align-middle">${arrayOrdenado[i].precio}</td>
          <td class="align-middle">${arrayOrdenado[i].cantidad}</td>            
          <td class="align-middle ps-3">
              <a href="#"  class="me-2 ms-2"><i
                      class="icon-edit fs-3 far fa-edit"></i></a>
              <a href="#" class="me-2"><i
                      class="text-danger icon-delete fs-3 far fa-trash-alt"></i></a>
              <a href="javascript:void(0)" data-bs-toggle="modal" onclick="vistaPrevia('')"
              data-bs-target="#modalVistaPrevia" type="button"><i
                      class="text-secondary icon-view fs-3 fas fa-eye"></i></a>
          </td>
          </tr>
      </tbody>
      `      
    }
   
    console.table(arrayOrdenado);
}
    