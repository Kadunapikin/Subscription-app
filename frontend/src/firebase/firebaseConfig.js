import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCYbmP3nwzSe8072wSsSjbcNs9-72whGGI",
  authDomain: "stripe-subscription-ab0e1.firebaseapp.com",
  projectId: "stripe-subscription-ab0e1",
  storageBucket: "stripe-subscription-ab0e1.appspot.com",
  messagingSenderId: "571452360984",
  appId: "1:571452360984:web:98e099617f9243bdfff66d"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;