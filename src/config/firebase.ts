import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRABSE_API_KEY,
    authDomain: process.env.REACT_APP_FIRABSE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIRABSE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRABSE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRABSE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIRABSE_MESSAGING_APP_ID,
    measurementId: process.env.REACT_APP_FIRABSE_MEASUREMENT_ID
  };

export const app = initializeApp(firebaseConfig);