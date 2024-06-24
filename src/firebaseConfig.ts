import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

