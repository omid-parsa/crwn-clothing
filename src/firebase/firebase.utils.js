import firebase from 'firebase/app';
import 'firebase/firestore'; //this is for database
import 'firebase/auth'; // this is for authentication

const config = {
    apiKey: "AIzaSyCaExUOmC1VsG88XfCq26awoAQ5ueR4lc8",
    authDomain: "crwn-db-f8765.firebaseapp.com",
    databaseURL: "https://crwn-db-f8765.firebaseio.com",
    projectId: "crwn-db-f8765",
    storageBucket: "crwn-db-f8765.appspot.com",
    messagingSenderId: "489247560037",
    appId: "1:489247560037:web:77d12962cd8231b78fd18c",
    measurementId: "G-KX0GTFR2H3"
  };

  export const createUserPropileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
      
    }
    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj)
    });

    return await batch.commit();
  }
  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map( doc => {
      const { title, items } = doc.data();
      return{
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });
    // console.log(transformedCollections); until here it an array only we added route name and id
    return transformedCollections.reduce( (accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {} );
    // at this point we changed it to an object that each part of it is an object and we assigned a name for each part
  }
  

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore(); // this is for database

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

   

  export default firebase;

