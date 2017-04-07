/*=================================================================

DRAW NUMBER OF TWEETS!!!!!!!

==================================================================*/
let followerCount = document.getElementById('followerCount').getContext('2d');

function followerCountUpdate(){
followerCount.save();
followerCount.clearRect(0,0,225,150);
  followerCount.beginPath();
    followerCount.font = '30px cabrito';
    followerCount.fillText('Total reach',20,60);
    followerCount.font = '50px cabrito';
    followerCount.fillText(`${numbOfTweets}`,20,110);
  followerCount.closePath();
followerCount.stroke();
}
