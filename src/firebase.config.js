// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase cartProducts that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCAlVZ9ld8ZOLpcNzJ5U6Yq4nhf8CIO5TU",
	authDomain: "fire-ecommerce-io.firebaseapp.com",
	projectId: "fire-ecommerce-io",
	storageBucket: "fire-ecommerce-io.appspot.com",
	messagingSenderId: "155063655952",
	appId: "1:155063655952:web:45cb134deaf4d0c5e17495",
	measurementId: "G-01G1BD0QGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseDB = getFirestore(app);

export default firebaseDB;
