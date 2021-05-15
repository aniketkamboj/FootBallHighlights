// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBRBg9jDSVLy1LYZla8LMqk6n9esaZuaag",
    authDomain: "tiktok-clone-f26b8.firebaseapp.com",
    projectId: "tiktok-clone-f26b8",
    storageBucket: "tiktok-clone-f26b8.appspot.com",
    messagingSenderId: "964594260398",
    appId: "1:964594260398:web:107321eff0771000b9503f",
    measurementId: "G-CMG13C27SP"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;