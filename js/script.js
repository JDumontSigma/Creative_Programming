'use strict';
//This is the number that will change!
var changingNumber = 0;

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
    },5000);
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
var currentData = [9,20,3,4,5];

var data = {
  //set the labels and how many points there are currently
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
  datasets: [{
    //pass through the data which has been set
    data:currentData,
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

function updateChart(newNumber){
  currentData.push(newNumber);
  currentData.shift();
  Chart.data.labels.push('New Integer');
  Chart.data.labels.shift();
  Chart.update();
}