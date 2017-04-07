//=======================================================================

//title

//========================================================================
var canvas = document.getElementById("myCanvas");
var title = canvas.getContext("2d");
function titleDisplay(){

    title.beginPath();
      title.font = '50px cabrito';
      title.fillText('The Health of Camp Digital',30,50);
      title.closePath();
}
titleDisplay();
