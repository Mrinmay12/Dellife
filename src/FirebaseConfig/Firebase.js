import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyArMdkhcvIqt5lXisuicnWFVk5vo3grlk8",
    authDomain: "voter-29270.firebaseapp.com",
    projectId: "voter-29270",
    storageBucket: "voter-29270.appspot.com",
    messagingSenderId: "430783478396",
    appId: "1:430783478396:web:8885eee6c1850743a667f9",
    measurementId: "G-QLG650LM87"
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  export { storage };