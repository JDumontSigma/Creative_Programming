/*=================================================================

DRAW NUMBER OF TWEETS!!!!!!!

==================================================================*/
//get the tweet count canvas
let tweetCount = document.getElementById('numbOfTweets').getContext('2d');
//set up a function to loop
function tweetCountUpdate(){
tweetCount.save();
//clear the rectangle path
tweetCount.clearRect(0,0,225,150);
//start a new text draw
  tweetCount.beginPath();
  //set the font
    tweetCount.font = '30px cabrito';
    //draw the title
    tweetCount.fillText('Total tweets',20,60);
    //change font setting mid way through
    tweetCount.font = '50px cabrito';
    //draw the number of tweets out to screen, using es6 JS
    tweetCount.fillText(`${numbOfTweets}`,20,110);
    //close the path
  tweetCount.closePath();
  //draw it
tweetCount.stroke();
}
