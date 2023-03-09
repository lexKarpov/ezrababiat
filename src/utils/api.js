import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCustomToken, onAuthStateChanged  } from "firebase/auth";
import {child, get, ref, set, getDatabase, onValue} from "firebase/database";
import {logDOM} from "@testing-library/react";

const firebaseConfig = {
  apiKey: "AIzaSyDX6gPBIr1xUASo4gujWduzGyxunlN9Eoc",
  authDomain: "ezrababiat.firebaseapp.com",
  projectId: "ezrababiat",
  storageBucket: "ezrababiat.appspot.com",
  messagingSenderId: "1020962718908",
  appId: "1:1020962718908:web:a741767f63c6a08dc8bcb9",
  databaseURL: "https://ezrababiat-default-rtdb.firebaseio.com/",
  serviceAccountId: 'my-client-id@my-project-id.iam.gserviceaccount.com',
};

const app = initializeApp (firebaseConfig);
// let auth = getAuth ();
const database = getDatabase ();
const dbRef = ref (getDatabase ());
const db = getDatabase();

export function createUser({email, name, password}) {
  return createUserWithEmailAndPassword(getAuth (), email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const {uid, email, accessToken} = user
      return set(ref(db, `users/${uid}`), {
        uid, name, email
        })
          .then (res => {
            console.log ('from current')
            return {name, email, accessToken, uid, password}
          })
          .then (res => res)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {errorCode, errorMessage}
    });
}

export function authorize(data) {
  const {email, password} = data
  return signInWithEmailAndPassword(getAuth (), email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      return user
    })
    .then(result => {
      return getUser(result.uid)
        .then(res => {
          console.log(res)
          console.log(result.stsTokenManager)
          return {
            user: result,
            userData: res,
            uid: result.uid
          }
        })
        .catch(err => console.log(err))
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function getUser(userId) {
  return get (child (dbRef, `users/${userId}`)).then ((snapshot) => {
    if (snapshot.exists ()) {
      return (snapshot.val ())
    } else {
      console.log ("No data available");
      return "noGetUser"
    }
  }).catch ((error) => {
    console.error (error);
  });
}

export function verifyToken(token){
  signInWithCustomToken(getAuth (), token)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('yeah!')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('no')
    });
}

export function testToken(uid) {
  console.log('lsdkfjsdlfj')
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log('sdfsdf')
    } else {
      // User is signed out
      console.log('errr')
    }
  });
}

testToken('7VuJUZH58ObzkPd5SzRriu1uEo83')
