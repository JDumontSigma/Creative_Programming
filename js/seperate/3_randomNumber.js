/*=================================================================

Generate a random number!!!!!!!

==================================================================*/
function randomNumber() {
    //change the variable to a new number
    //to increase of decrease the number increase of decrease the number 10
    changingNumber = Math.floor((Math.random() * 10) + 1);
    //displauys the new value on screen
    document.getElementById('number').innerHTML = changingNumber;
    //increase the number of tweets
    numbOfTweets = numbOfTweets + changingNumber;
    tweetCountUpdate();
    followerCountUpdate();
    //sets up a looping function

    setTimeout(function(){
      //calls the same function
      randomNumber();
      updateChart(changingNumber);
      //currently set to loop every 5 seconds
      //1000 = 1 second
    },2500);
}
//call the function to start the change

randomNumber();
