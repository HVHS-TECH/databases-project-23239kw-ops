function loadGeoDashLeaderboard() {
    
    let leaderboard = document.getElementById("GeoDashLeaderboard");
    
    firebase.database().ref("userInfo/").once("value", function(snapshot) {
       leaderboard.innerHTML = "";  
       snapshot.forEach(function(childSnapshot) {
        let userData = childSnapshot.val();

        if (userData.bestScore2 != null) {
        leaderboard.innerHTML +=
          "<p>" + userData.gameName + ": " + userData.bestScore2 + "</p>";

        }

    });
  });
}