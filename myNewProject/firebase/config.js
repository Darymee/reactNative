import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxpeTEjIeSuUPNE6BdEDhW_RPOaeJgWyc",
  authDomain: "react-native-project-799f7.firebaseapp.com",
  projectId: "react-native-project-799f7",
  storageBucket: "react-native-project-799f7.appspot.com",
  messagingSenderId: "616911099660",
  appId: "1:616911099660:web:0557953e18c0ed6bf15b29",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
