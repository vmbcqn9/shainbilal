// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const requestNotificationPermission = async () => {
  try {
    await messaging.requestPermission();
    console.log("Notification permission granted.");
    // Get the device token to send push notifications later
    const token = await messaging.getToken();
    console.log("FCM Token:", token);
  } catch (error) {
    console.error("Error while requesting notification permission", error);
  }
};


const firebaseConfig = {
  apiKey: "AIzaSyDLZbnw8aJgycnmSNO0XpH191sdvwbCFvY",
  authDomain: "eatsocial-b8b11.firebaseapp.com",
  projectId: "eatsocial-b8b11",
  storageBucket: "eatsocial-b8b11.firebasestorage.app",
  messagingSenderId: "301620156594",
  appId: "1:301620156594:web:5d67b7e25ade8d6bf2d1ab",
  measurementId: "G-MFM3RS7L88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

