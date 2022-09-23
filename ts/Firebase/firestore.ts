import APP from "./app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

const FIRESTORE = getFirestore(APP);

export default FIRESTORE;
export { doc, getDoc, setDoc, deleteDoc };
