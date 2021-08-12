const db = firebase.firestore();

function saveDocument(collection,obj)
{
  return db.collection(collection).doc().set(Object.assign({}, obj));
}