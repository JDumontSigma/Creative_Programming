/*=================================================================

SCATTERGRAM TITLE!!!!!!!

==================================================================*/
let scatterTitle = document.getElementById('scatterTitle').getContext('2d');

function scaTitle(){
  if(increaseNumber === null){increaseNumber = 0;}
  scatterTitle.save();
  scatterTitle.clearRect(0,0,500,300);
    scatterTitle.beginPath();
      scatterTitle.font = '30px cabrito';
      scatterTitle.fillText('Average Reach Rate',20,50);
      scatterTitle.fillText(`${increaseNumber} people per minute`,20,100);
    scatterTitle.closePath();
  scatterTitle.stroke();
}


/*=================================================================

SCATTERGRAM ANIMATION!!!!!!!

==================================================================*/
//Gather then canvas id and content
let scatter = document.getElementById('scatter').getContext('2d');
//a quick variable which generates and returns a random number
let random = (min,max) => Math.floor(Math.random() * max + min);

//define a constant function for drawing the ball
const ball = function(size,x,y,colour){
  //begins the path
  scatter.beginPath();
  //draw a circle
    scatter.arc(x,y,size,0,2*Math.PI);
    //set the fill and stoke colour
    scatter.fillStyle = colour;
    scatter.strokeStyle = colour;
    //fill and stroke the circle
    scatter.fill();
  scatter.stroke();
};

//Set variables for the drawing system which shall be used
//scatterGram is the object to store data
//progress determines when to pull in the next number
//speed is how fast it moves across the screen
//drawn is for the first iteration
//keep the balls having a unique number in the JSON object
//gather a number to show a varying quantity
//colours to changes the colours of the ball
let scatterGram = {},
    progress = 251,
    speed= 1,
    ballNumb = 0,
    increaseNumber = 0,
    colour = ['#333','rgba(215, 40, 40, 0.2)','rgba(215, 143, 44, 0.2)','rgba(90, 143, 44, 0.2)','rgba(90, 62, 149, 0.2)',' rgba(203, 62, 149, 0.2)','rgba(78, 255, 179, 0.2)'];


//the drawing function
function drawScatterGram(){
  //save and clear the canvas data
  scatter.save();
  scatter.clearRect(0,0,500,275);
  //checks to see if elements have already been drawn

    //if the balls have not fully entered the screen then do this
    if(progress < 400){
      //loop through the json object
      for(let balls in scatterGram){
        //pull in the data about the ball
        let x = scatterGram[balls].x,
            y = scatterGram[balls].y,
            colour = scatterGram[balls].colour,
            size = scatterGram[balls].size,
            //increase its position
            newX = x + speed;
            //redraw the ball
            ball(size,newX,y,colour);
            //check to see if it is still in the screen
            if(newX > 510){
              //if not delete it from the JSON object
              delete scatterGram[balls];
            }else{
              //save the new position to the JSON object
              scatterGram[balls].x = newX;
            }
      }
      //increase the progression
      progress++;
    }else{
      //reset the progress
      progress = 0;
      //grab a new version of the number

      //loop through all the current objects in the object first
      for(let balls in scatterGram){
        //gather all the details
        let x = scatterGram[balls].x,
            y = scatterGram[balls].y,
            colour = scatterGram[balls].colour,
            size = scatterGram[balls].size,
            //set new speed
            newX = x + speed;
            //redraw the ball
            ball(size,newX,y,colour);
            //save the nex x positon
            scatterGram[balls].x = newX;
      }
      increaseNumber = increaseNumber / 10;
      if(increaseNumber > 750){
        increaseNumber = 750;
      }
      //draw the next wave of balls
      for(let x = 0; x < increaseNumber; x++){
        //generate random numbers and place them off canvas
        let x = random(1,400) * -1;
        let y = random(15,250),
            colourChoice = random(1,7),
            size = random(2,6);
        //store them into the json object
        scatterGram[ballNumb] = {'x':x,'y':y,'colour':colour[colourChoice],'size':size};
        //draw them onto the screen
        ball(size,x,y,colour[colourChoice]);
        //increase the ball number
        ballNumb++;
      }
    }
    //if it is the first iteration of drawing

//draw all the changes
  scatter.stroke();
  //set a loop function to repeat this process
  setTimeout(function(){
    drawScatterGram();
  },10);

}
drawScatterGram();
