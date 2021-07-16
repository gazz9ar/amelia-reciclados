

/* INICIALIZO variable de firebase */
const db = firebase.firestore();

export const onGetCollection = (collection,callback) => {

    const collectionSelected = db.collection(collection);
    collectionSelected.onSnapshot(callback); 
  
  }