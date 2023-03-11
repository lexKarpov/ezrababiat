import {initializeApp} from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCustomToken,
  onAuthStateChanged
} from "firebase/auth";
import {child, get, ref, set, getDatabase, update} from "firebase/database";

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

const app = initializeApp(firebaseConfig);
let auth = getAuth();
const database = getDatabase();
const dbRef = ref(getDatabase());
const db = getDatabase();

export function createUser({email, name, password}) {
  const tasks = [
    'lskdjf'
  ]
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const {uid, email} = user
      return set(ref(db, `users/${uid}`), {
        uid, name, email, tasks
      })
        .then(res => {
          return {name, email, uid, password, tasks}
        })
        .then(res => res)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {errorCode, errorMessage}
    });
}

export function authorize(data) {
  const {email, password} = data
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user
    })
    .then(result => {
      return getUser(result.uid)
        .then(res => {
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
  return get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return (snapshot.val())
    } else {
      console.log("No data available");
      return "noGetUser"
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function writeGoodTask(title, uid) {
  const db = getDatabase();
  let newList = []
  return getUser(uid)
    .then(res => res.tasks)
    .then(task => {
      newList = [...task, title]
      return update(ref(db, 'users/' + uid), {
        tasks: [...task, title],
      })
    }).then(_=> newList)
}

export function updateProfile(uid, name, email) {
  return update(ref(db, 'users/' + uid), {
    name,
    email,
  }).then(_ => {
    return {
      name,
      email,
      uid
    }
  })
}

export function deleteCard(newArr, uid) {
  return update(ref(db, 'users/' + uid), {
    tasks: newArr
  }).then(_ => {
    return {
      newArr
    }
  })
}


export function getAllUsers() {
  return get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return (snapshot.val())
    } else {
      return "noGetUsers"
    }
  }).catch((error) => {
    console.error(error);
  });
}


