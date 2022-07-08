import firebase from 'firebase/app' 
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDg0HGEW0umZiuCWBCyFhzFVFw-XtVRLbo",
    authDomain: "sportsstore-e2dbc.firebaseapp.com",
    projectId: "sportsstore-e2dbc",
    storageBucket: "sportsstore-e2dbc.appspot.com",
    messagingSenderId: "634581924187",
    appId: "1:634581924187:web:f663eeedecb3186412427e",
    measurementId: "G-XBWGPBV18K"
  };
  firebase.initializeApp(firebaseConfig);

  const storage =firebase.storage();
  
  export {storage,firebase as default};