import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-N8HNN_-zwc9G2bI7FzVOg1AHoYu28gE',
  authDomain: 'school-b736f.firebaseapp.com',
  projectId: 'school-b736f',
  storageBucket: 'school-b736f.appspot.com',
  messagingSenderId: '965050908386',
  appId: '1:965050908386:web:a7e650482ea75d175368bb',
  measurementId: 'G-VJV4Q2QV1K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
