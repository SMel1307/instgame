
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";


import {
  getFirestore,
  collection,  
  onSnapshot, 
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"; 


const firebaseConfig = {
	apiKey: "AIzaSyAE80k1QFFYe_7Pg6jAvIZMQOuy8n21FHc",
  authDomain: "crudinst.firebaseapp.com",
  projectId: "crudinst",
  storageBucket: "crudinst.appspot.com",
  messagingSenderId: "1042491038451",
  appId: "1:1042491038451:web:d1e77b19fd6752621cf586"
};


export const app = initializeApp(firebaseConfig);


export const db = getFirestore(); 


export const guardarPersona = (appa,apma,nombre,fecha,dir,tel,email,genero) =>
  addDoc(collection(db, "Persona"), { appa,apma,nombre,fecha,dir,tel,email,genero});

 
export const obtenerPersona = (callback) =>
  onSnapshot(collection(db, "Persona"), callback);


export const eliminaPersona= (id) => deleteDoc(doc(db, "Persona", id));

export const obtenerPersonaXid = (id) => getDoc(doc(db, "Persona", id));

export const actualizarPersona = (id, objPersona) =>
  updateDoc(doc(db, "Persona", id), objPersona);
