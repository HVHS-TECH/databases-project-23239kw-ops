function helloWorld(){
console.log("Running bludMax()")
  firebase.database().ref('/users').set('Roy')
}