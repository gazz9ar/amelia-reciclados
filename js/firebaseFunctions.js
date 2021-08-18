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

