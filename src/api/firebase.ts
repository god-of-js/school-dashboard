import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyBQvKF_vSVJ5NdG2xUw9BxIGpwJ2J_Wr7M",
  authDomain: "truckdispatch-dev-f91c5.firebaseapp.com",
  projectId: "truckdispatch-dev-f91c5",
  storageBucket: "truckdispatch-dev-f91c5.appspot.com",
  messagingSenderId: "933361691211",
  appId: "1:933361691211:web:8be58978b0a426a25dbbce",
  measurementId: "G-1VGQYX724K"
};
// @ts-ignore
if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: "AIzaSyCJPLkHg56lgScrtj6HSS08BAkuvmSutgY",
    authDomain: "truckdispatch-prod.firebaseapp.com",
    projectId: "truckdispatch-prod",
    storageBucket: "truckdispatch-prod.appspot.com",
    messagingSenderId: "1032360007058",
    appId: "1:1032360007058:web:c6bacf9e6ae3b2b1de5d4b",
    measurementId: "G-PWFKVW0ZSK"
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;