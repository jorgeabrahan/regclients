import APP from "./app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AUTH = getAuth(APP);

export default AUTH;
export { signInWithEmailAndPassword };
