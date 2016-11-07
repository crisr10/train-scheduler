  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBdk4e1BhnnJmJs_ITIvP12S7NSDUqrgs",
    authDomain: "train-time-71db7.firebaseapp.com",
    databaseURL: "https://train-time-71db7.firebaseio.com",
    storageBucket: "train-time-71db7.appspot.com",
    messagingSenderId: "1090249410591"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on('child_added',function(childSnapshot){
  	var newTrain = childSnapshot.val().trainName;
  	var newDestination = childSnapshot.val().destination;
  	var newTrainTime = childSnapshot.val().trainTime;
  	var newFrequency = childSnapshot.val().frequency;

  	var currentTime = moment().format('HH:mm');
  	var firstTimeConverted = moment(newTrainTime,'HH:mm').subtract(1,'years');
  	var timeDifference = moment().diff(moment(firstTimeConverted),'minutes');

  	//Time remainder in minutes
  	var timeRemainder = timeDifference % newFrequency;
	var minutesAway = newFrequency - timeRemainder;
	var nextArrival = moment().add(minutesAway, 'minutes');
	var nextArrivalConverted = moment(nextArrival).format("HH:mm");

  	$('#trainData').append('<tr><td>'+newTrain+'</td><td>'+newDestination+'</td><td>'+newFrequency+'</td><td>'+nextArrivalConverted+'</td><td>'+minutesAway+'</td></tr>');
  })

  $('#submitButton').on('click',function(){

  	var trainName = $('#trainName').val().trim();
  	var destination = $('#destination').val().trim();
  	var firstTrainTime = $('#trainTime').val().trim();
  	var frequency = $('#frequency').val().trim();

  	database.ref().push({
  		trainName: trainName,
  		destination: destination,
  		trainTime: firstTrainTime,
  		frequency: frequency,
  	})

  	return false;

  });