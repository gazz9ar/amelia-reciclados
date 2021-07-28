const db = firebase.firestore();
const onGetCollection = (collection,callback) => {

    const collectionSelected = db.collection(collection);
    collectionSelected.onSnapshot(callback); 
  
  }

  function getCollection(collection)
{
    let collectionSelected = db.collection(collection);  
    return collectionSelected.get(); 
}

const col1 = document.getElementById("col-1");
const col2 = document.getElementById("col-2");
const col3 = document.getElementById("col-3");
let products = [];


window.addEventListener('DOMContentLoaded', (e) => {

    onGetCollection('products',( querySnapshot => {
      
      products = [];
  
      col1.innerHTML = '';


      
      
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

        console.log(products);

        // PRIMER ARRAY CON EL QUE DEBO RENDERIZXAR COL-1
        let arrayCol1 = products.slice(0, Math.ceil(products.length / 3) );
        
        console.log(arrayCol1);      
        
     
    }))
    
  })