import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    // apiKey: "AIzaSyArMdkhcvIqt5lXisuicnWFVk5vo3grlk8",
    // authDomain: "voter-29270.firebaseapp.com",
    // projectId: "voter-29270",
    // storageBucket: "voter-29270.appspot.com",
    // messagingSenderId: "430783478396",
    // appId: "1:430783478396:web:8885eee6c1850743a667f9",
    // measurementId: "G-QLG650LM87"
    apiKey: "AIzaSyD1omNZoFqNY7zNpaDDSc7E0wAKK1GPKDQ",
  authDomain: "node-45d47.firebaseapp.com",
  projectId: "node-45d47",
  storageBucket: "node-45d47.appspot.com",
  messagingSenderId: "789729373593",
  appId: "1:789729373593:web:e45b73299436f770aa3708",
  measurementId: "G-T12BWLCX06"
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  export { storage };
