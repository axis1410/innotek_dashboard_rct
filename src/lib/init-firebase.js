// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAICyVHt0N62GR1JvAt9yqK8UdoMIDLTBs',
	authDomain: 'maps-flutter-f7cb2.firebaseapp.com',
	projectId: 'maps-flutter-f7cb2',
	storageBucket: 'maps-flutter-f7cb2.appspot.com',
	messagingSenderId: '519231298854',
	appId: '1:519231298854:web:2d2e0eaf8c648c6e2e75e7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
