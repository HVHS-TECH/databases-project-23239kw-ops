function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;  // Save the user details object to a global variable
    console.log("User has logged in")
    console.log(GLOBAL_user)
    alert("You've logged in, welcome")
  });
}

function fb_write() {

    const name =
    document.getElementById("name").value;

    const age =
    document.getElementById("age").value;

    console.log('Users name is ' + name +
        '. Their age is ' + age.);
    //let userID = _user.uid;
        //console.log(userID);
    firebase.database().ref("/userInfo/" + name).set({

    name: name,
    age: age,
  });
  document.getElementById('statusMessage').innerHTML = `Form submitted!`
}