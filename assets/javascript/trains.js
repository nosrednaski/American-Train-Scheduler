$(document).ready(function(){
  var config = {
      apiKey: "AIzaSyBVa8H7eXBw_9NDnHiEdSY-l8irG8Go3eQ",
      authDomain: "example-51ea1.firebaseapp.com",
      databaseURL: "https://example-51ea1.firebaseio.com",
      projectId: "example-51ea1",
      storageBucket: "example-51ea1.appspot.com",
      messagingSenderId: "252778690472"
    };
    firebase.initializeApp(config);
  
    var trainData = firebase.database();
      
      
      var name = "";
      var destination = "";
      var trainTime = "HH:mm";
      var frequency = "";

      
      
      $(".columns").on("click", "#submitButton", function(event) {
        event.preventDefault();
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#trainTime").val().trim();
        frequency = $("#frequency").val().trim();

              
            var trainTimeCon = moment(trainTime, "HH:mm").subtract(1, "years");
            console.log(trainTimeCon);
      
           
            var now = moment();
            console.log("CURRENT TIME: " + moment(now).format("hh:mm"));
      
            
            var diffTime = moment().diff(moment(trainTimeCon), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);
      
            
            var tRemainder = diffTime % frequency;
            console.log(tRemainder);
      
            
            var tMinutesTillTrain = frequency - tRemainder;
            var tMinutesTillTrain = tMinutesTillTrain.toString();
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      
            
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");

            var nextTrain = (moment(nextTrain).format("hh:mm")).toString();
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Code for the push
        trainData.ref().push({
          name: name,
          destination: destination,
          frequency: frequency,
          nextTrain: nextTrain,
          tMinutesTillTrain: tMinutesTillTrain,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $(":input").val("");
        
      }); 
      
      $(".columns").on("click", "#clearButton", function() {
        firebase.database().ref().update(null);
      });
      
      // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
      trainData.ref().on("child_added", function(childSnapshot) {
       
          $("tbody").append("<tr></tr>");
          $("tbody").append("<td>" + childSnapshot.val().name + "</td>");
          $("tbody").append("<td>" + childSnapshot.val().destination + "</td>");
          $("tbody").append("<td>" + childSnapshot.val().frequency + "</td>");
          $("tbody").append("<td>" + childSnapshot.val().nextTrain + "</td>");
          $("tbody").append("<td>" + childSnapshot.val().tMinutesTillTrain + "</td>");      
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
});