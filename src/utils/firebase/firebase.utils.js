import { initializeApp } from "firebase/app";
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDcc-Z0ySh-PfdsOfSKl62EXIUJIIAEexw",
   authDomain: "first-react-app-eb93c.firebaseapp.com",
   projectId: "first-react-app-eb93c",
   storageBucket: "first-react-app-eb93c.appspot.com",
   messagingSenderId: "50404510185",
   appId: "1:50404510185:web:82b0e860463405c858a378",
   measurementId: "G-L19Q60S6CV",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, provider);

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {}
) => {
   const userDocRef = doc(db, "users", userAuth.uid);
   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth; // User data pulled when logging in
      const createdAt = new Date(); // Log the time of logging in

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         });
      } catch (error) {
         console.log(`Error creating user ${error.message}`);
      }
   }
   return userDocRef;
};

export const createAuthUserFromEmailAndPassword = async (email, password) => {
   if (!email || !password) {
      return;
   }

   return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserFromEmailAndPassword = async (email, password) => {
   if (!email || !password) {
      return;
   }

   return await signInWithEmailAndPassword(auth, email, password);
};
