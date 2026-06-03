const firebaseConfig = {
    apiKey: "AIzaSyCXd6HNiv0b6bb_yYrm5QfN5GmiJJVu-JM",
    authDomain: "comp-kev.firebaseapp.com",
    databaseURL: "https://comp-kev-default-rtdb.firebaseio.com",
    projectId: "comp-kev",
    storageBucket: "comp-kev.firebasestorage.app",
    messagingSenderId: "761343379611",
    appId: "1:761343379611:web:2d9fab49e77df8e9b35e3e",
    measurementId: "G-WKXYYC7T9F"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);