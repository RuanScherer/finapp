import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPMRDV2Asn_4fr6rcaZ8XIITqS4J6yQzI",
  authDomain: "xshare-53fbe.firebaseapp.com",
  projectId: "xshare-53fbe",
  storageBucket: "xshare-53fbe.appspot.com",
  messagingSenderId: "281574292377",
  appId: "1:281574292377:web:c290199db40ee677a9f108",
};

initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth();
const firestore = firebaseFirestore.getFirestore();

export { auth, firestore };
