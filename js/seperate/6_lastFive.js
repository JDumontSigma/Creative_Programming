/*=================================================================

LAST 5!!!!!!!

==================================================================*/
//USED FOR DEMO PURPOSES
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


let tweetNames = ['@name_tne','@name_two','@name_three','@name_four','@name_five'];
let five = document.getElementById('lastFive').getContext('2d');

function lastFive(){
  let spacing = 100;
  //shuffle used for demo purposes only
  shuffle(tweetNames);
  //save canvas context
  five.save();
  //clear the previous content
  five.clearRect(0,0,400,350);
    five.beginPath();
    //set up font variables
      five.font = '30px cabrito';
      //provide a title
      five.fillText('Last five infected',20,50);
      //loop through the 5 array elements to display them
      for(let i = 0; i < 5; i++){
        //write out the text and increase the y position
        five.fillText(tweetNames[i],40,spacing);
        spacing = spacing + 50;
      }
    five.closePath();
  five.stroke();

  //loop the function every 1 seconds
  //this will be replaced by a event emitter
  setTimeout(function(){
    lastFive();
  },1000);
}
//start the function off
lastFive();
