import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyC2E0bB9-9zhiqPeV1afOMSlFm3bZ3JY3I",
  authDomain: "reverr-9b71f.firebaseapp.com",
  projectId: "reverr-9b71f",
  storageBucket: "reverr-9b71f.appspot.com",
  messagingSenderId: "841618165004",
  appId: "1:841618165004:web:c4d39df92e2a5d1bf58d29",
  measurementId: "G-WB1CH29BJR"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app,auth};