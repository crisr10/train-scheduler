$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBdk4e1BhnnJmJs_ITIvP12S7NSDUqrgs",
    authDomain: "train-time-71db7.firebaseapp.com",
    databaseURL: "https://train-time-71db7.firebaseio.com",
    storageBucket: "train-time-71db7.appspot.com",
    messagingSenderId: "1090249410591"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');

  provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});


  var database = firebase.database();
  var trainName = '';
  var destination = '';

  database.ref().on('child_added',function(childSnapshot){
  	var newTrain = childSnapshot.val().trainName;
  	var newDestination = childSnapshot.val().destination;
  	var newTrainTime = childSnapshot.val().trainTime;
  	var newFrequency = childSnapshot.val().frequency;

  	// var currentTime = moment().format('hh:mm');
  	var firstTimeConverted = moment(newTrainTime,'hh:mm').subtract(1,'years');
  	var timeDifference = moment().diff(moment(firstTimeConverted),'minutes');

  	//Time remainder in minutes
  	var timeRemainder = timeDifference % newFrequency;
	var minutesAway = newFrequency - timeRemainder;
	var nextArrival = moment().add(minutesAway, 'minutes');
	var nextArrivalConverted = moment(nextArrival).format('LT');



	$('#trainData').append('<tr class="trainRow"><td class="newTrain">'
		+newTrain+'</td><td class="newDestination">'
		+newDestination+'</td><td class="newFrequency">'
		+newFrequency+'</td><td class="nextArrival">'
		+nextArrivalConverted+'</td><td class="minutesAway">'
		+minutesAway+'</td></tr>');
	// $('#trainData').append('<tr class="rowOfDta"></tr>');
  })

  $('#submitButton').on('click',function(){

  	trainName = $('#trainName').val().trim();
  	destination = $('#destination').val().trim();
  	var firstTrainTime = $('#trainTime').val().trim();
  	var frequency = $('#frequency').val().trim();

  	$('#trainName').val('');
  	$('#destination').val('');
  	$('#trainTime').val('');
  	$('#frequency').val('');

  	database.ref().push({
  		trainName: trainName,
  		destination: destination,
  		trainTime: firstTrainTime,
  		frequency: frequency
  	})

  	return false;

  });


});