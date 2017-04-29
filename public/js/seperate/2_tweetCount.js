/*=================================================================

DRAW NUMBER OF TWEETS!!!!!!!

==================================================================*/
let tweetCount = document.getElementById('numbOfTweets').getContext('2d');
function tweetCountUpdate(){
tweetCount.save();
tweetCount.clearRect(0,0,225,150);
  tweetCount.beginPath();
    tweetCount.font = '30px cabrito';
    tweetCount.fillText('Total tweets',20,60);
    tweetCount.font = '50px cabrito';
    tweetCount.fillText(`${numbOfTweets}`,20,110);
  tweetCount.closePath();
tweetCount.stroke();
}
