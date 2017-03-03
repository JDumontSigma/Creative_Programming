//=======================================================================

//title

//========================================================================
var canvas = document.getElementById("myCanvas");
var title = canvas.getContext("2d");
title.font = "50px cabrito";
title.fillStyle="Black";
title.fillText("The Health of  ",75,50);
title.closePath();
title.beginPath();
title.fillStyle="Red";
title.fillText(" Camp Digital!",400,50);