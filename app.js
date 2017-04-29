'use strict';

const express = require('express'),
      app = express(),
      ejs = require('ejs'),
      bodyParser = require('body-parser'),
      port = 3000,
      path = require('path'),
      http =require('http'),
      Twitter = require('ntwitter'),
      twitterAuth = require('./twitter.json'),
      SocketIO = require('socket.io');



const server = http.createServer(app),
      io = SocketIO.listen(server);

//use the twitter authentication codes from eperate file
let twitter = new Twitter(twitterAuth);



app.set('port', process.env.PORT || 5000);

//set up some basic settings within express
app.use(express.static(path.join(__dirname, 'public')));
app.set('view options', { layout: true });
app.set('views','./views');
app.set('view engine','ejs');
//determines doc type
app.use(bodyParser());

//Data to store all the stats about Camp Digital
let numbOfTweets = 0,
    numbOfFollowers = 0,
    tweetNames = new Array(),
    tweetContent = new Array(),
    averageCount = 0,
    cycleCount = 0,
    cycleFollow = 0,
    cycleCount_Array = new Array(),
    cycleFollow_Array = new Array();



//Display the chart page
app.get('/',function (req,res){
  res.render('chart');
});


//format the data into the element we want
function formatData(data) {
    return {
        tweet: data.text,
        user: data.user.screen_name,
        follow: data.user.followers_count,
        location: data.user.location
    };
}

function cycleStream(){
  cycleCount_Array.push(cycleCount);
  cycleFollow_Array.push(cycleFollow);
  cycleFollow = cycleFollow / cycleCount;
  if(typeof cycleFollow === 'undefined' || cycleFollow === null){
    cycleFollow = 0;
  }
  io.sockets.emit('cycle',{count: cycleCount, follow: cycleFollow});
  cycleCount = cycleFollow = 0;
  setTimeout(function(){
    cycleStream();
  },5000);
}
function getTwitterStream(keyword) {
    twitter.stream('statuses/filter', {track: keyword}, function (stream) {
        stream.on('data', function (data) {
          numbOfTweets++;
          numbOfFollowers = numbOfFollowers + data.user.followers_count;
          cycleCount++;
          cycleFollow = cycleFollow + data.user.followers_count;
          tweetNames.push(data.user.screen_name);
          tweetContent.push(data.text);
          averageCount = numbOfFollowers/numbOfTweets;
          io.sockets.emit('new_tweet', {tweetCount: numbOfTweets, followerCount:numbOfFollowers, tweetNames:tweetNames,tweetContent:tweetContent,averageCount:averageCount});
        });
        stream.on('error', function (err) {
            console.log('ERROR');
            console.log(err);
        });
    });
}

//Call as many streams as you want with different words
getTwitterStream('UX');
cycleStream();

//set the server up and running
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
