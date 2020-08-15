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

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore(); // this is for database

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

   

  export default firebase;

