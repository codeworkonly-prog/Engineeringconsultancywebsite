import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAWO4p8TMJu-TodIsI4UEtPSq8KIJC1r8U",
    authDomain: "dikshacp-7305f.firebaseapp.com",
    projectId: "dikshacp-7305f",
    storageBucket: "dikshacp-7305f.firebasestorage.app",
    messagingSenderId: "525360929982",
    appId: "1:525360929982:web:2f426ce9d9535d8a5cd2ef",
    measurementId: "G-HZ50BQVEXY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
