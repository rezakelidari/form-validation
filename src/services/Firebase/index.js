import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwUBa_aZ2buSgGtB5kRCgaT1tIvfX-5mE",
  authDomain: "form-validation-ab92b.firebaseapp.com",
  projectId: "form-validation-ab92b",
  storageBucket: "form-validation-ab92b.appspot.com",
  messagingSenderId: "328631291657",
  appId: "1:328631291657:web:de403b32ed1ad0e75e4dd8",
  measurementId: "G-3NCK8GEVZQ",
};

const initialize = firebase.initializeApp(firebaseConfig);

const auth = getAuth(initialize);
auth.languageCode = "fa";
const analytics = getAnalytics(initialize);

const SignUp = async (email, password) => {
  let result = "OK";
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      logEvent(analytics, `User ${email} Created an account`);
    })
    .catch((error) => {
      logEvent(analytics, `An error occurred during ${email} Signing up`);
      result = error.code;
    });
  return result;
};

const LogIn = async (email, password) => {
  let result = "OK";
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      logEvent(analytics, `User ${email} Logged in`);
    })
    .catch((error) => {
      logEvent(analytics, `An error occurred during ${email} Login`);
      result = error.code;
    });
  return result;
};

const LogOut = (navigate) => {
  logEvent(analytics, `User ${auth.currentUser.email} Loging out`);
  signOut(auth).then(() => {
    navigate("/login");
  });
};

export { auth, SignUp, LogIn, LogOut };
