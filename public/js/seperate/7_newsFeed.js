var text ={};

var furthestPosition = 0;
var length = 1700;
var numbOfTweet = 0;

var ctx = document.getElementById('canvas').getContext('2d');

var newsSpeed = 1;//sets the speed in which the text will move.

ctx.beginPath();
ctx.font="20px cabrito";
ctx.fillStyle="Red";

//this sets the font style.

function draw(){
  ctx.save();
  ctx.clearRect(0,0,1280,50);
//clears the draw function and starts it again so it goes in a loop
  if(_.isEmpty(text)){
    ctx.fillText("Awaiting Tweets.....", 20, 30);
  }else{
    for(var message in text){
      var x = text[message].x - newsSpeed;
     ctx.fillText( text[message].string,x,30);
     text[message].x = x;
      if(x < -1700){
        x = furthestPosition;
        furthestPosition = furthestPosition + 1700;
        text[message].x = x;
      }

   }
   furthestPosition = furthestPosition - newsSpeed;
  }

  ctx.stroke();
  setTimeout(function(){
    draw();
  },10);
  //this sets the timer before clearning the cvans to start again and then tells
  //the canvas to draw again
}

draw();
