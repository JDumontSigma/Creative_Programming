var text ={};

var furthestPosition = 1400;
var length = 200;
var numbOfTweet = 0;

for(var x = 0; x < 8; x++){
  var pos = x * length;
  text[x] = {'string' : '@demo tweet', 'x':pos,'position':x};
}
//This sets the strings that are going to be displayed and also where to start the string from. 

var ctx = document.getElementById('canvas').getContext('2d');

var newsSpeed = 0.5;//sets the speed in which the text will move.

ctx.beginPath();
ctx.font="20px cabrito";
ctx.fillStyle="Red";

//this sets the font style. 

function draw(){
  ctx.save();
  ctx.clearRect(0,0,1280,50);
//clears the draw function and starts it again so it goes in a loop
  
 for(var message in text){
   var x = text[message].x - newsSpeed; 
  ctx.fillText( text[message].string,x,30);
   if(x < -200){
     x = furthestPosition;
   }
   //this sets the string length but chars 
   text[message].x=x;
} 
  ctx.stroke();
  setTimeout(function(){
    draw();
  },10);
  //this sets the timer before clearning the cvans to start again and then tells 
  //the canvas to draw again
}

draw();
