/*=================================================================

DRAW NUMBER OF TWEETS!!!!!!!

==================================================================*/
//get the follower count canvas
let followerCount = document.getElementById('followerCount').getContext('2d');
//set up a function
function followerCountUpdate(){
followerCount.save();
//clear the path
followerCount.clearRect(0,0,225,150);
  //begin a new path
  followerCount.beginPath();
    //set font variables
    followerCount.font = '30px cabrito';
    //draw the title
    followerCount.fillText('Total reach',20,60);
    //change the font varibales mid way
    followerCount.font = '50px cabrito';
    //draw out the follower count using es6 syntax
    followerCount.fillText(`${numbOfFollowers}`,20,110);
    //close the path
  followerCount.closePath();
  //draw it to the screen
followerCount.stroke();
}
