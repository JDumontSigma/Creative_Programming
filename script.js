'use strict';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function drawRectangle(moveX,moveY,startX,startY,width,height){
  ctx.moveTo(moveX,moveY);
  ctx.rect(startX,startY,width,height);
};

function drawLine(moveX,moveY,endX,endY){
ctx.moveTo(moveX,moveY);
ctx.lineTo(endX,endY);
ctx.stroke();
};
