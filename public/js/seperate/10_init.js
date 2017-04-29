$(document).ready(function(){
  tweetCountUpdate();
  followerCountUpdate();
  lastFive();
  //provide an initial call to the function
  scale();
  updateSpeed();
  let counter = 0;

  let socket = io.connect('/');
  socket.on('new_tweet', function(data){
    numbOfTweets++;
    numbOfFollowers = (data.followerCount).toLocaleString();
    tweetNames = data.tweetNames.splice(-5);
    heartSpeed = heartSpeed + 4;

    text[counter] = {'string': data.tweetContent[counter], 'x': furthestPosition};
    furthestPosition = furthestPosition + 1700;
    counter++;
    defineHeartSpeed();
    followerCountUpdate()
    tweetCountUpdate();
    lastFive();
  });

  socket.on('cycle', function(data){
    updateChart(data.count);
    if(increaseNumber === null){
      increaseNumber = 0;
    }else{
      increaseNumber = data.follow;
    }
    scaTitle();
  });
});



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
