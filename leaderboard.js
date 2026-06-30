firebase.database()
    .ref("userInfo")
    .once("value")
    .then(function(snapshot){

        let leaderboard = [];

        snapshot.forEach(function(child){

            leaderboard.push({
                name: child.val().name,
                score: child.val().geoDashHighScore
            });

        });

        leaderboard.sort(function(a,b){
            return b.score - a.score;
        });

        console.log(leaderboard);
    });