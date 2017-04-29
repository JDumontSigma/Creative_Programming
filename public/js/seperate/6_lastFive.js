/*=================================================================

LAST 5!!!!!!!

==================================================================*/
//define variable
let tweetNames = ['','','','',''];
//get canvas content
let five = document.getElementById('lastFive').getContext('2d');

//define function
function lastFive(){
  //layout position variable
  let spacing = 100;
  //save canvas context
  five.save();
  //clear the previous content
  five.clearRect(0,0,400,350);
    five.beginPath();
    //set up font variables
      five.font = '30px cabrito';
      //provide a title
      five.fillText('Lastest Five',20,50);
      //loop through the 5 array elements to display them
      for(let i = 0; i < 5; i++){
        five.font = '25px cabrito';
        //write out the text and increase the y position
        //check to see whether the varaibels are empty or not
        if(typeof tweetNames[i] === 'undefined' || tweetNames[i] === null){
            five.fillText('Awaiting Tweet...' ,20,spacing);
        }else{
            five.fillText('@' + tweetNames[i],20,spacing);
        }

        spacing = spacing + 60;
      }
    five.closePath();
  five.stroke();
}
