//get the holding element to demonstrate the array
let heartDraw = document.getElementById('heartCanvas').getContext('2d');
//This is -1 from the max number of images
let lastImg = 30;
//set a starting postiion at the beginning
let position = 1;
//provide a direction for the array to move
let scaleDirection = 'up';


//Dynamically changing the speed of the heart based on number inputs
//set a base rate for the heart
let heartSpeed= 60;
let heartRate = 60;

//a function is set here to manage the speed
function updateSpeed(){
  if(heartSpeed > 60){
    heartSpeed = heartSpeed - 4;
  }
  //this will update the speed every 5 seconds
  setTimeout(function(){
    updateSpeed();
  },10000);
}






//initiate a function which will display and eventually change the image
function scale(){
  let img = `heart_${position}`;
  let currentImg = document.getElementById(img);
  //empty the content of the holding div
  heartDraw.clearRect(0,0,600,300);
  //set the div to the new number in the array
  heartDraw.drawImage(currentImg,0,0);
  heartDraw.font = '50px cabrito';
  heartDraw.fillText(`${heartSpeed} BPM`,280,165);
  //if the array is moving up add to the position
  if (scaleDirection === 'up') {
    position++;
    //if the array has reached the end then set the direction to downwards
    if(position === lastImg){
      scaleDirection = 'down';
    }
    //if the array is not increasing go downwards
  }else{
    position--;
    //if it reaches the first element in the array set it to upwards
    if(position === 1){
      scaleDirection = 'up';
    }
  }

  //loop over the function repeatedly
  setTimeout(function(){
    scale();
    //updates depending on the heart speed set by function above
  },heartRate);

}
