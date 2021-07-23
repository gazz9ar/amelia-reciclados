// import {Producto,Usuario} from './clasesTienda.js'


const db = firebase.firestore();

const tablaStock = document.getElementById("con-stock-table");
const imgProduct = document.getElementById("img-product");
const vistaPreviaCantidad = document.getElementById("vista-previa-cantidad");
const vistaPreviaTitle = document.getElementById("vista-previa-title");
const vistaPreviaPrecio = document.getElementById("vista-previa-precio");
const orderGroup = document.getElementById("orderGroup");

const modalVistaPreviaBody = document.getElementById("modal-body");
const spinnerZ = document.getElementById("spinner-z");

//DECLARO ARRAY DE OBJETOS DE PRODUCTO
let products = [ ];
//array que guarda los uid de cada documento
let productsUid = [];


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
const saveDocument = (collection,obj,products) => {
    // =================================================================================
    // Se usa Object.assign ya que firestore no reconoce un objeto de tipo personalizado
    // =================================================================================
    db.collection(collection).doc().set(Object.assign({}, obj))
    .then(() => {
      localStorage.removeItem('productsId');
      localStorage.setItem("productsId",JSON.stringify(products.sort(Producto.dynamicSort('id'))));
    })
    .catch((err)=>{
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:err
      });
    });
    

}
// EDITAR UN DOCUMENTO CUALQUIERA
const editDocument = (collection,uid,obj) => {

  db.collection(collection).doc(uid).set(Object.assign({}, obj))

}





function vistaPrevia(uid)
    { 
      modalVistaPreviaBody.classList.add('d-none');
          spinnerZ.classList.remove('d-none');
      
      const collection = db.collection('products');
    
      let docRef = collection.doc(uid);

      
     docRef.get()
     .then( (doc) => {

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
          modalVistaPreviaBody.classList.remove('d-none');
          spinnerZ.classList.add('d-none');
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
    
    products = [];

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


        productsUid.push(doc.id);
        //DEBERIA GUARDAR EL UID EN LOCAL STORAGE PARA CUANDO ORDENE EL ARRAY Y RENDERIZE NUEVAMENTE NO SE PIERDA

        let uid = doc.id;
        let product = doc.data();  
        //le agrego una propiedad al objeto con el UID del documento
        product.uid =  uid;        

        const milliseconds = product.fecha  // 1575909015000

        const dateObject = new Date(milliseconds)

        const humanDateFormat = dateObject.toLocaleString("en-US", {day: "numeric"}) + '/' + dateObject.toLocaleString("en-US", {month: "numeric"})  + '/' + dateObject.toLocaleString("en-US", {year: "numeric"})
        
        product.fecha = humanDateFormat;
        
        
        products.push(product);
        

        tablaStock.innerHTML += `
        
        <tbody>
            <tr id="product-id-${product.id}">
            <td style="width:50px;" class="fs-4" >${product.id}</td>
            <td class="align-middle">
                <p>${product.nombre}</p>
            </td>
            <td class="align-middle">${product.fecha}</td>
            <td class="align-middle">${product.precio}</td>
            <td class="align-middle">${product.cantidad}</td>            
            <td class="align-middle ps-3">
                <a href="#" onclick="editProduct('${uid}')" class="me-2 ms-2"><i
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
      // guardo en local Storage el array de objetos de productos con su respectivo UID
   
     localStorage.removeItem("productsId");
     localStorage.setItem("productsId",JSON.stringify(products.sort(Producto.dynamicSort('id'))));     
       // guardo en local Storage array con UID de los productos
     localStorage.setItem("productsUid",JSON.stringify(productsUid));
   
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

  products.sort(Producto.dynamicSort(property));

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


    for (let i = 0; i < products.length; i++) {
      
      

      tablaStock.innerHTML += `
        
      <tbody>
          <tr id="product-id-${products[i].id}">
          <td style="width:50px;" class="fs-4" >${products[i].id}</td>
          <td class="align-middle">
              <p>${products[i].nombre}</p>
          </td>
          <td class="align-middle">${products[i].fecha}</td>
          <td class="align-middle">${products[i].precio}</td>
          <td class="align-middle">${products[i].cantidad}</td>            
          <td class="align-middle ps-3">
              <a href="#" onclick="editProduct('${products[i].uid}')" class="me-2 ms-2"><i
                      class="icon-edit fs-3 far fa-edit"></i></a>
              <a href="#" class="me-2"><i
                      class="text-danger icon-delete fs-3 far fa-trash-alt"></i></a>
              <a href="javascript:void(0)" data-bs-toggle="modal" onclick="vistaPrevia('${products[i].uid}')"
              data-bs-target="#modalVistaPrevia" type="button"><i
                      class="text-secondary icon-view fs-3 fas fa-eye"></i></a>
          </td>
          </tr>
      </tbody>
      `      
    }
   
    
}
    