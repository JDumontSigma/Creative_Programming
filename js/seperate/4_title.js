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
