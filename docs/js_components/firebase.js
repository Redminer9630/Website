import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWzMK-zv449Y2N9TTqtIihybccXw3i-HI",
    authDomain: "redminer9630web.firebaseapp.com",
    databaseURL: "https://redminer9630web-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "redminer9630web",
    storageBucket: "redminer9630web.appspot.com",
    messagingSenderId: "796701483690",
    appId: "1:796701483690:web:1262163b86375c6d8926d3",
    measurementId: "G-98DDEG10MK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
