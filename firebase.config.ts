import { initializeApp } from "firebase/app";
import firebaseConfig from "./keys.json";

const app = initializeApp(firebaseConfig);

export { app };