'use strict';
//This is the number that will change!
var changingNumber = 0;
var allData = [9,20,3,4,5];
var labels = ['Red', 'Blue', 'Yellow', 'Green', 'Orange'];
let numbOfTweets= 0;

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
    numbOfTweets = numbOfTweets + changingNumber;
    tweetCountUpdate();

    //sets up a looping function

    setTimeout(function(){
      //calls the same function
      randomNumber();
      updateChart(changingNumber);
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
    backgroundColor: 'rgba(106, 202, 197, 0.05)',
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

/*=================================================================

SCATTERGRAM TITLE!!!!!!!

==================================================================*/
let scatterTitle = document.getElementById('scatterTitle').getContext('2d');

function scaTitle(){
  scatterTitle.save();
  scatterTitle.clearRect(0,0,500,300);
    scatterTitle.beginPath();
      scatterTitle.font = '30px cabrito';
      scatterTitle.fillText('Average Infection Rate',20,50);
      scatterTitle.fillText(`${increaseNumber} per minute`,20,100);
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
    increaseNumber = changingNumber * 30,
    colour = ['#333','rgba(215, 40, 40, 0.2)','rgba(215, 143, 44, 0.2)','rgba(90, 143, 44, 0.2)','rgba(90, 62, 149, 0.2)',' rgba(203, 62, 149, 0.2)','rgba(78, 255, 179, 0.2)'];


//the drawing function
function drawScatterGram(){
  //save and clear the canvas data
  scatter.save();
  scatter.clearRect(0,0,500,275);
  //checks to see if elements have already been drawn

    //if the balls have not fully entered the screen then do this
    if(progress < 250){
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
      increaseNumber = changingNumber * 30;
      scaTitle();
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
      //draw the next wave of balls
      for(let x = 0; x < increaseNumber; x++){
        //generate random numbers and place them off canvas
        let x = random(1,250) * -1;
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
//USED FOR DEMO PURPOSES
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


let tweetNames = ['@name_tne','@name_two','@name_three','@name_four','@name_five'];
let five = document.getElementById('lastFive').getContext('2d');

function lastFive(){
  let spacing = 100;
  //shuffle used for demo purposes only
  shuffle(tweetNames);
  //save canvas context
  five.save();
  //clear the previous content
  five.clearRect(0,0,400,350);
    five.beginPath();
    //set up font variables
      five.font = '30px cabrito';
      //provide a title
      five.fillText('Last five infected',20,50);
      //loop through the 5 array elements to display them
      for(let i = 0; i < 5; i++){
        //write out the text and increase the y position
        five.fillText(tweetNames[i],40,spacing);
        spacing = spacing + 50;
      }
    five.closePath();
  five.stroke();

  //loop the function every 1 seconds
  //this will be replaced by a event emitter
  setTimeout(function(){
    lastFive();
  },1000);
}
//start the function off
lastFive();
