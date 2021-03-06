//document is now completely loaded
$(document).ready(function(){
    //provide an initial call to the functions
  tweetCountUpdate();
  followerCountUpdate();
  lastFive();
  scale();
  updateSpeed();
  let counter = 0;

//sets up a socket conntection to the server
  let socket = io.connect('/');
  //wait for the new tweet event
  socket.on('new_tweet', function(data){
    //manupulate data appropriately
    numbOfTweets++;
    numbOfFollowers = (data.followerCount).toLocaleString();
    tweetNames = data.tweetNames.splice(-5);
    heartSpeed = heartSpeed + 4;

    text[counter] = {'string': data.tweetContent[counter], 'x': furthestPosition};
    furthestPosition = furthestPosition + 1700;
    counter++;
    //do appropriate updates
    defineHeartSpeed();
    followerCountUpdate()
    tweetCountUpdate();
    lastFive();
  });
  //wait for the cycle event
  socket.on('cycle', function(data){
    //manipulate the received data
    updateChart(data.count);
    if(increaseNumber === null){
      increaseNumber = 0;
    }else{
      increaseNumber = data.follow;
    }
    scaTitle();
  });
});


//does common check to increase and decrease the heart rate on screen
function defineHeartSpeed(){
  if(heartSpeed === 60){
    heartRate = 60;
  }else if(heartSpeed > 60 && heartSpeed < 80){
    heartRate = 50;
  }else if(heartSpeed > 80 && heartSpeed < 100){
    heartRate = 40;
  }else if(heartSpeed > 100 && heartSpeed < 120){
    heartRate = 30;
  }else if(heartSpeed > 120 && heartSpeed < 140){
    heartRate = 20;
  }else if(heartSpeed > 140 && heartSpeed < 160){
    heartRate = 10;
  }else if(heartRate > 160){
    heartRate = 5;
  }
}

'use strict';
//This is the number that will change!
var changingNumber = 0;
var allData = [9,20,3,4,5];
var labels = ['Red', 'Blue', 'Yellow', 'Green', 'Orange'];
let numbOfTweets= 0;
let numbOfFollowers = 0;

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

/*=================================================================

Generate a random number!!!!!!!

==================================================================*/
function randomNumber() {
    //change the variable to a new number
    //to increase of decrease the number increase of decrease the number 10
    changingNumber = Math.floor((Math.random() * 10) + 1);
    //displauys the new value on screen
    document.getElementById('number').innerHTML = changingNumber;
    //increase the number of tweets
    //numbOfTweets = numbOfTweets + changingNumber;
    //tweetCountUpdate();
    //followerCountUpdate();
    //sets up a looping function

    setTimeout(function(){
      //calls the same function
      randomNumber();
      //updateChart(changingNumber);
      //currently set to loop every 5 seconds
      //1000 = 1 second
    },2500);
}
//call the function to start the change

randomNumber();

/*=================================================================

BACKGROUND CHART CODE!!!!!!!

==================================================================*/
//Get the chart canvas information
var chart = document.getElementById('chart').getContext('2d');
//Define the variable for the chart settings
var Chart;


var data = {
  //set the labels and how many points there are currently
  labels: labels,
  datasets: [{
    //pass through the data which has been set
    data:allData,
    //set the background colour for the chart
    backgroundColor: 'rgba(106, 202, 197, 0.15)',
    //set the line colour for the chart
    borderColor: 'rgba(106, 202, 197, 0.15)'
  }]
};

//Removes the legend from the top of the chart
Chart.defaults.global.legend.display = false;
//remove the tool tips which appear when hovering over elemetns
Chart.defaults.global.tooltips.enabled = false;

Chart = new Chart(chart, {
  type: 'line',
  data: data,
  options: {
    scales: {
    	xAxes: [{
        //hide the X axis scale
        display:false,
      }],
      yAxes: [{
        //hide the Y axix scale
        display:false,
        ticks: {
          //makes the Y axis start at 0
        	beginAtZero:true
        }
      }]
    }
  }
});

/*=================================================================

UPDATE BACKGROUND CHART CODE!!!!!!!

==================================================================*/
//call a function
function updateChart(newNumber){
  //add the new number to the arrau
  allData.push(newNumber);
  //currentData = allData.slice(-5);
  //oush a random label through
  labels.push('New Integer');
  //currentLabels = labels.slice(-5);
  Chart.data.datasets[0].data = allData.slice(-5);
  Chart.data.labels = labels.slice(-5);
  //remove the first element in the array
  //update the chart
  Chart.update();
}

//=======================================================================

//title

//========================================================================
var canvas = document.getElementById("myCanvas");
var title = canvas.getContext("2d");
function titleDisplay(){

    title.beginPath();
      title.font = '50px cabrito';
      title.fillText('The Health of ',30,50);
      title.fillStyle = 'Red';
      title.fillText('Camp Digital',365,50);
      title.closePath();
}

/*=================================================================

SCATTERGRAM TITLE!!!!!!!

==================================================================*/
//get the title canvas for the scattergraph
let scatterTitle = document.getElementById('scatterTitle').getContext('2d');

//set a function
function scaTitle(){
  //second check to see if variable id empty
  if(increaseNumber === null){increaseNumber = 0;}

  scatterTitle.save();
  //clear the rectngle of previous data
  scatterTitle.clearRect(0,0,500,300);
    //new title
    scatterTitle.beginPath();
    //set the font settings
      scatterTitle.font = '30px cabrito';
      //write out static text
      scatterTitle.fillText('Average Reach Rate',20,50);
      //fill in dynamic data using es6 syntax
      scatterTitle.fillText(`${increaseNumber} people per minute`,20,100);
    scatterTitle.closePath();
    //draw out to the screen
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
        //shit the way down to make layout appropriate
        spacing = spacing + 60;
      }
    five.closePath();
  five.stroke();
}

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
