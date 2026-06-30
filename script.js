let currentUser = null;

// Keep track of authentication state
firebase.auth().onAuthStateChanged((user) => {
    currentUser = user;

    if (user) {
        console.log("User is logged in:");
        console.log(user);
    } else {
        console.log("No user logged in.");
    }
});

// Google sign in
function fb_popupLogin() {
    if (currentUser) {
        console.log("Already logged in.");
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope("profile");
    provider.addScope("email");

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log("Successfully signed in.");
            currentUser = result.user;
        })
        .catch((error) => {
            console.error(error);
        });
}

// Save user information
function fb_write() {
    if (!currentUser) {
        alert("Please log in first.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;

    if (!name || !age) {
        alert("Please fill in everything.");
        return;
    }

    firebase.database()
        .ref("userInfo/" + currentUser.uid)
        .set({
            username: name,
            age: Number(age),
            profilePicture: currentUser.photoURL || "",
            displayName: currentUser.displayName || ""
        })
        .then(() => {
            document.getElementById("statusMessage").textContent =
                "Info saved!";
            console.log("User information saved.");
        })
        .catch((error) => {
            console.error(error);
        });
}

// Display leaderboard
function loadLeaderboard(databaseName, outputID) {
    firebase.database()
        .ref(databaseName)
        .orderByChild("score")
        .limitToLast(5)
        .once("value")
        .then((snapshot) => {

            let results = [];

            snapshot.forEach((child) => {
            console.log(child.val());
            results.push(child.val());
        });

            results.reverse();

            let leaderboardHTML = "<ol>";

            for (const player of results) {
                leaderboardHTML += `
                    <li>${player.name} - ${player.score}</li>
                `;
            }

            leaderboardHTML += "</ol>";

            document.getElementById(outputID).innerHTML =
                leaderboardHTML;
        })
        .catch((error) => {
            console.error(error);
        });
}

// Load leaderboards
loadLeaderboard("birdComingHighscore", "birdComingLeaderboard");
loadLeaderboard("geoDashHighscore", "geoDashLeaderboard");