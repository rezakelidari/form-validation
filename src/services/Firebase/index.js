import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  deleteUser,
  updateProfile,
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
auth.useDeviceLanguage();
const analytics = getAnalytics(initialize);

const SignUp = async (email, password, name) => {
  let result = "OK";
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      logEvent(analytics, `User ${email} Created an account`);
      updateProfile(auth.currentUser, { displayName: name });
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

const LogOut = async () => {
  logEvent(analytics, `User ${auth.currentUser.email} Loging out`);
  let result = "";

  await signOut(auth)
    .then(() => {
      result = "OK";
    })
    .catch((error) => {
      result = error;
    });

  return result;
};

const Verify = async () => {
  let result = "";
  logEvent(
    analytics,
    `Sending user ${auth.currentUser.email} verification mail`
  );

  await sendEmailVerification(auth.currentUser)
    .then(() => {
      result = "OK";
    })
    .catch((error) => {
      result = error.code;
    });

  return result;
};

const DeleteAccount = async () => {
  let result = "";
  await deleteUser(auth.currentUser)
    .then(() => {
      result = "OK";
    })
    .catch((error) => {
      result = error.code;
    });
  return result;
};

export { auth, SignUp, LogIn, LogOut, Verify, DeleteAccount };
