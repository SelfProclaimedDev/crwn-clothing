import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyB9iUJphEGxO5Zn2Dv_AOzhsf2knZK3c7U",
    authDomain: "crwn-db-2808e.firebaseapp.com",
    databaseURL: "https://crwn-db-2808e.firebaseio.com",
    projectId: "crwn-db-2808e",
    storageBucket: "crwn-db-2808e.appspot.com",
    messagingSenderId: "1050530732461",
    appId: "1:1050530732461:web:69bbc60068f69e291c2924",
    measurementId: "G-9P6EJKZRCT"
  };


  export const createUserProfileDocument = async(userAuth, additonalData) =>{

    if(!userAuth) return;

    console.log(userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();


    if(!snapShot.exists){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{

            await userRef.set({

                displayName,
                email,
                createdAt,
                ...additonalData

            })
        }

        catch(error){

            console.log(error);
            
        }


    }

    return userRef;

  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;