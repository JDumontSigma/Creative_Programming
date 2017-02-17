'use strict';
//This is the number that will change!
var changingNumber = 0;

//Generates a random number!
function randomNumber() {
    //change the variable to a new number
    //to increase of decrease the number increase of decrease the number 10
    changingNumber = Math.floor((Math.random() * 10) + 1);
    //displauys the new value on screen
    document.getElementById('number').innerHTML = changingNumber;
    //sets up a looping function
    setTimeout(function(){
      //calls the same function
      randomNumber();
      //currently set to loop every 5 seconds
      //1000 = 1 second
    },5000);
}
//call the function to start the change
randomNumber();
