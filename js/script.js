'use strict';
//This is the number that will change!
var changingNumber = 0;
var allData = [9,20,3,4,5];
var labels = ['Red', 'Blue', 'Yellow', 'Green', 'Orange'];
//Generates a random number!
function randomNumber() {
    //change the variable to a new number
    //to increase of decrease the number increase of decrease the number 10
    changingNumber = Math.floor((Math.random() * 10) + 1);
    //displauys the new value on screen
    document.getElementById('number').innerHTML = changingNumber;
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
    backgroundColor: 'rgba(106, 202, 197, 0.25)',
    //set the line colour for the chart
    borderColor: 'rgba(106, 202, 197, 0.5)'
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
    progress = 0,
    speed= 1,
    drawn = false,
    ballNumb = 0,
    increaseNumber = changingNumber * 30,
    colour = ['#333','rgba(215, 40, 40, 0.2)','rgba(215, 143, 44, 0.2)','rgba(90, 143, 44, 0.2)','rgba(90, 62, 149, 0.2)',' rgba(203, 62, 149, 0.2)','rgba(78, 255, 179, 0.2)'];


//the drawing function
function drawScatterGram(){
  //save and clear the canvas data
  scatter.save();
  scatter.clearRect(0,0,500,275);
  //checks to see if elements have already been drawn
  //only used on the first round
  if(drawn){
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
            if(newX > 505){
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
        let y = random(10,265),
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
  }else{
    //create the relevant amount of balls
    for(let x = 0; x < increaseNumber; x++){
      //set the variables
      let x = random(1,250) * -1,
          y = random(10,260),
          colourChoice = random(1,7),
          size = random(2,6);
          //store the information into JSON
      scatterGram[ballNumb] = {'x':x,'y':y,'colour':colour[colourChoice],'size':size};
      //draw the balls
      ball(size,x,y,colour[colourChoice]);
      scaTitle();
      //increase the ball number
      ballNumb++;
      //set the drawn to true
      drawn = true;
    }
  }
//draw all the changes
  scatter.stroke();
  //set a loop function to repeat this process
  setTimeout(function(){
    drawScatterGram();
  },10);

}
drawScatterGram();
