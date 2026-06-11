let currentUser = null;
let loggedIn = 'false';

function fb_popupLogin() {
    firebase.auth().onAuthStateChanged((user) => {
        currentUser = user;

        if (loggedIn = 'false') {
        console.log("Not logged in");

        const provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('profile');
        provider.addScope('email');

        console.log("login popup");

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                currentUser = result.user;
                console.log('User is logged in');
                console.log(currentUser);
                loggedIn = 'true';
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });
}

function fb_write() {
    if (!currentUser) {
        alert("Please log in first");
    }else{
      console.log('successfully logged data')
    }

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    if (!name || !age) {
        alert("Please fill in everything");
    }

    firebase.database().ref("userInfo/" + currentUser.uid).set({
        username: name,
        age: age,
        profilePicture: currentUser.photoURL,
        displayName: currentUser.displayName
    });
    return;
}