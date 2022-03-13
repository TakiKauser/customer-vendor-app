import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebase.config";

const initAuth = () => {
    initializeApp(firebaseConfig);
    // getAnalytics(app);
}

export default initAuth;