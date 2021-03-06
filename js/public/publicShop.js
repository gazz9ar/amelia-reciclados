
// const onGetCollection = (collection,callback) => {

//     const collectionSelected = db.collection(collection);
//     collectionSelected.onSnapshot(callback); 
  
//   }

  let contadorProductosCol1 = 0;
  let contadorProductosCol2 = 0;
  

//   function getCollection(collection)
// {
//     let collectionSelected = db.collection(collection);  
//     return collectionSelected.get(); 
// }

let arrayUrls = [];

const col1 = document.getElementById("col-1");
const col2 = document.getElementById("col-2");
const col3 = document.getElementById("col-3");
let products = [];

$(document).ready(

  onGetCollection('products',( (querySnapshot) => {


    
      
    products = [];
    

    col1.innerHTML = '';
    col2.innerHTML = '';
    col3.innerHTML = '';

    $('#col-1-mobile').html('');
    $('#col-2-mobile').html('');


    
    
    querySnapshot.forEach(
      (doc) => {  

        

        let uid = doc.id;
        let product = doc.data();  
        //le agrego una propiedad al objeto con el UID del documento
        product.uid =  uid;        

        const milliseconds = product.fecha;  // 1575909015000
        product.fechaMs = milliseconds;
        
        const dateObject = new Date(milliseconds);

        const humanDateFormat = dateObject.toLocaleString("en-US", {day: "numeric"}) + '/' + dateObject.toLocaleString("en-US", {month: "numeric"})  + '/' + dateObject.toLocaleString("en-US", {year: "numeric"});
        
        product.fecha = humanDateFormat;          
        
        products.push(product);

      }
    );

      
     localStorage.setItem('productsId',JSON.stringify(products));
      // PRIMER ARRAY CON EL QUE DEBO RENDERIZXAR COL-1
      let arrayCol1 = [];
      let arrayCol2 = [];
      let arrayCol3 = [];

      let arrayCol1Mobile = [];
      let arrayCol2Mobile = [];


      // ============================================================================================================================================
      // MAQUETADO DISEÑADO EN 3 COLUMNAS COMO INSTAGRAM, NO IMPORTA LA CANT  DE PRODUCTOS, SE DEBEN IR CARGANDO DE IZQ  A DERECHA EN LAS 3 COLUMNAS
      // ============================================================================================================================================

      

      // Si la cant de productos es divisible por 3
      if (products.length % 3 == 0) {

          // lo divido en partes iguales
         arrayCol1 = products.slice(0, Math.ceil(products.length / 3) );
      
         arrayCol2 = products.slice(Math.ceil(products.length / 3), ( products.length - Math.ceil(products.length / 3 )));

         arrayCol3 = products.slice(( products.length - Math.ceil(products.length / 3 )), products.length);
      } else {

        // 1 sobra = 1er columna ------------- 2 sobra = 1ra y 2da columna
         arrayCol1 = products.slice(0, Math.ceil(products.length / 3) );
      
         arrayCol2 = products.slice(Math.ceil(products.length / 3), ( products.length - Math.ceil(products.length / 3 )) + 1);
        
         arrayCol3 = products.slice(( products.length - Math.ceil(products.length / 3 ) + 1), products.length);



         arrayCol1Mobile = products.slice(0,Math.ceil(products.length / 2));

         arrayCol2Mobile = products.slice(Math.ceil(products.length / 2),products.length);

         
      }
      for (const product of arrayCol1Mobile) {

        let docRef = db.collection('products').doc(product.uid);
       
        docRef.get().then((doc)=>{

          let productDocument = doc.data();
          if (doc.exists) {

            let storageRef  = firebase.storage().ref(); 
            storageRef.child('shopImages/' + productDocument.imgUrl).getDownloadURL()
            .then(function(url){

              $('#col-1-mobile').append(`


                      <div class="item-wrapper " id="product-uid-${product.uid}">
                                
                      <a href="javascript:void(0)" class="d-block position-relative product-link" type="button"
                          onclick="agregarCarrito('${product.uid}')" id="a-1-col-${contadorProductosCol1}">

                        

                          <img src="${url}" alt="${product.description}" class="img-thumbnail img-shop-mobile">
                          
                          
                          <!-- OCULTO -->
                          <div
                              class="position-absolute text-center w-75  start-50 agregar translate-middle d-none m-auto">
                              <p>Agregar al Carrito</p>
                          </div>
                        

                      </a>

                      <div class="item-info-shop">

                        <h3 class="fs-5 product-title mb-1 pt-2"> ${product.nombre}</h3>                        
                        <p class="fs-6 fw-bold product-text">$${product.precio}</p>
                      </div>                       
                  </div>
              `);


              $(`#a-1-col-${contadorProductosCol1}`).append(`
                <div class="position-absolute shopping-bag-mobile">
                    <a class="shopping-bag-mobile-link" ><i class="fas fa-shopping-bag"></i></a>
                </div>
                `);

                contadorProductosCol1++;
            })

          }
        })
      }

      for (const product of arrayCol2Mobile) {

        let docRef = db.collection('products').doc(product.uid);
       
        docRef.get().then((doc)=>{

          let productDocument = doc.data();
          if (doc.exists) {

            let storageRef  = firebase.storage().ref(); 
            storageRef.child('shopImages/' + productDocument.imgUrl).getDownloadURL()
            .then(function(url){

              $('#col-2-mobile').append(`


                      <div class="item-wrapper " id="product-uid-${product.uid}">
                                
                      <a href="javascript:void(0)" class="d-block position-relative product-link" type="button"
                          onclick="agregarCarrito('${product.uid}')" id="a-2-col-${contadorProductosCol2}">

                        

                          <img src="${url}" alt="${product.description}" class="img-thumbnail img-shop-mobile">
                          
                          
                          <!-- OCULTO -->
                          <div
                              class="position-absolute text-center w-75  start-50 agregar translate-middle d-none m-auto">
                              <p>Agregar al Carrito</p>
                          </div>
                        

                      </a>

                      <div class="item-info-shop">

                        <h3 class="fs-5 product-title mb-1 pt-2"> ${product.nombre}</h3>                        
                        <p class="fs-6 fw-bold product-text">$${product.precio}</p>
                      </div>                       
                  </div>
              `);


              $(`#a-2-col-${contadorProductosCol2}`).append(`
                <div class="position-absolute shopping-bag-mobile">
                    <a class="shopping-bag-mobile-link" ><i class="fas fa-shopping-bag"></i></a>
                </div>
                `);

                contadorProductosCol2++;
            })

          }
        })
      }
      
      for (const product of arrayCol1) {
        
        let docRef = db.collection('products').doc(product.uid);
       
        docRef.get().then((doc)=>{
          let productDocument = doc.data();
          if (doc.exists) {
            let storageRef  = firebase.storage().ref(); 
            storageRef.child('shopImages/' + productDocument.imgUrl).getDownloadURL()
            .then(function(url){
              
              col1.innerHTML += `
          
                <div class="item-wrapper " id="product-uid-${product.uid}">
                        
                        <a href="javascript:void(0)" class="d-block position-relative product-link" type="button"
                            onclick="agregarCarrito('${product.uid}')">

                           

                            <img src="${url}" alt="${product.description}" class="img-thumbnail">
                            
                            
                            <!-- OCULTO -->
                            <div
                                class="position-absolute text-center w-75  start-50 agregar translate-middle d-none m-auto">
                                <p>Agregar al Carrito</p>
                            </div>
                           

                        </a>

                        <div class="item-info-shop">

                          <h3 class="fs-5 product-title mb-1 pt-2"> ${product.nombre}</h3>                        
                          <p class="fs-6 fw-bold product-text">$${product.precio}</p>
                        </div>                       
                    </div>
                `;
                
                arrayUrls.push({
                  uid:product.uid,
                  url:url
                })
                
                localStorage.setItem('productsUrls',JSON.stringify( arrayUrls ));

            })


          }
        });
        
          
         
      }
      for (const product of arrayCol2) {
        
        let docRef = db.collection('products').doc(product.uid);
       
        docRef.get().then((doc)=>{
          let productDocument = doc.data();
          if (doc.exists) {
            let storageRef  = firebase.storage().ref(); 
            storageRef.child('shopImages/' + productDocument.imgUrl).getDownloadURL()
            .then(function(url){
              col2.innerHTML += `
          
              <div class="item-wrapper" id="product-uid-${product.uid}">
                    
                        <a href="javascript:void(0)" class="d-block position-relative product-link" type="button"
                            onclick="agregarCarrito('${product.uid}')" id="a-col-${contadorProductosCol2}">
                            <img src="${url}" alt="Mueble Barniz" class="img-thumbnail">
                            <!-- OCULTO -->
                            <div
                                class="position-absolute text-center w-75  start-50 agregar translate-middle d-none m-auto">
                                <p>Agregar al Carrito</p>
                            </div>
                        </a>

                        <div class="item-info-shop">

                          <h3 class="fs-5 product-title mb-1 pt-2"> ${product.nombre}</h3>                        
                          <p class="fs-6 fw-bold product-text">$${product.precio}</p>
                        </div>
                    </div>
                `;
                

                $(`#a-col-${contadorProductosCol2}`).append(`
                <div class="position-absolute shopping-bag-mobile">
                    <a class="shopping-bag-mobile-link"><i class="fas fa-shopping-bag"></i></a>
                </div>
                `);
                arrayUrls.push({
                  uid:product.uid,
                  url:url
                })
                
                localStorage.setItem('productsUrls',JSON.stringify( arrayUrls ));

            })


          }
        });
    }
      for (const product of arrayCol3) {
          
        let docRef = db.collection('products').doc(product.uid);
       
        docRef.get().then((doc)=>{
          let productDocument = doc.data();
          if (doc.exists) {
            let storageRef  = firebase.storage().ref(); 
            storageRef.child('shopImages/' + productDocument.imgUrl).getDownloadURL()
            .then(function(url){
              col3.innerHTML += `
          
              <div class="item-wrapper" id="product-uid-${product.uid}">
                    
                        <a href="javascript:void(0)" class="d-block position-relative product-link" type="button"
                            onclick="agregarCarrito('${product.uid}')">
                            <img src="${url}" alt="Mueble Barniz" class="img-thumbnail">
                            <!-- OCULTO -->
                            <div
                                class="position-absolute text-center w-75  start-50 agregar translate-middle d-none m-auto">
                                <p>Agregar al Carrito</p>
                            </div>
                        </a>
                        <div class="item-info-shop">

                          <h3 class="fs-5 product-title mb-1 pt-2"> ${product.nombre}</h3>                        
                          <p class="fs-6 fw-bold product-text">$${product.precio}</p>
                        </div>
                          
                    </div>
                `;                  

                

                arrayUrls.push({
                  uid:product.uid,
                  url:url
                })
                
                localStorage.setItem('productsUrls',JSON.stringify( arrayUrls ));
                
                

            })


          }
        });
    }

   
  }))
)

