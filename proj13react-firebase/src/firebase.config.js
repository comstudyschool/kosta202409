import {initializeApp} from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSAIEVR_5wKhw2gumkpYXm2urtIY47pYI",
  authDomain: "study21.firebaseapp.com",
  projectId: "study21",
  storageBucket: "study21.appspot.com",
  messagingSenderId: "422619551959",
  appId: "1:422619551959:web:09862523b64bc6f9fdb892"
};

const app = initializeApp(firebaseConfig);
const dbService = getFirestore(app);

export {dbService, collection, addDoc};
