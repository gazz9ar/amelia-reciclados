const db = firebase.firestore();


function saveDocument(collection,obj,doc)
{
  return db.collection(collection).doc(doc).set(Object.assign({}, obj));
}

function getCollection(collection,doc)
{
    let collectionSelected = db.collection(collection).doc(doc);  
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