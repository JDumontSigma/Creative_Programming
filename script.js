'use strict';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function drawRectangle(moveX,moveY,startX,startY,width,height){
  ctx.moveTo(moveX,moveY);
  ctx.rect(startX,startY,width,height);
  ctx.stroke();
}

function drawLine(moveX,moveY,endX,endY){
ctx.moveTo(moveX,moveY);
ctx.lineTo(endX,endY);
ctx.stroke();
}

function drawCircle(moveX,moveY,startX,startY,width){
ctx.beginPath();
ctx.arc(startX,startY,width,0,2*Math.PI);
ctx.stroke();
}


function body(){
  drawRectangle(40,40,40,40,300,450);
  drawRectangle(40,40,40,40,300,20);
  drawRectangle(40,340,40,470,300,20);
  drawRectangle(160,200,160,200,60,150);
  drawCircle(190,420,190,420,30);
}

body();
