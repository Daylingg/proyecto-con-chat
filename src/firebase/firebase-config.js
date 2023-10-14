
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAptL-oYu4XlJVzI1gQVTk3pbwBHmM3Kho",
  authDomain: "chat-blog-b2c0b.firebaseapp.com",
  projectId: "chat-blog-b2c0b",
  storageBucket: "chat-blog-b2c0b.appspot.com",
  messagingSenderId: "147191459116",
  appId: "1:147191459116:web:b7a25ed62b4961029f9089"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const provider= new GoogleAuthProvider()
const storage =getStorage(app)

export{
    db,
    auth,
    provider,
    storage
}