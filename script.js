
// VARIABILESF
var c=document.getElementById('myCanvas');
var ctxDrawer=c.getContext('2d'); 


var pb=document.getElementById('pauseBtn');
var tb=document.getElementById('tddBtn');

var rb=document.getElementById('rightBtn');
var lb=document.getElementById('leftBtn');

var ub=document.getElementById('upBtn');
var db=document.getElementById('downBtn');

pb.width='10px';

var running=true;
var finished=false;

var score=0;

var isCollision;

var WIDTH=300;
var HEIGHT=500;


// var speed=50;

// http://images.clipartpanda.com/car-clipart-top-view-red-car-top-view-hi.png

var keys=[];

//OBJECTS
var dash={
  x:30,
  y:0,
  // speed:50,
  width:10,
  height:30
};

var car={ 
  x:150,
  y:110,
  color:'red',
  turnSpeed:10,
  width:50,
  height:30
};

var truck={ 
  x:20,
  y:0,
  speed:10,
  color:'black',  
  width:60,
  height:45
};


//left and right by KEYS LISTENTERS
window.onkeydown = function(e) {
   keys[e.keyCode]=true; 
   // s('onkeydown-'+e.keyCode); 
  //s(keys);  
}

window.onkeyup = function(e) {
  delete keys[e.keyCode];
  // s('onkeyup-'+e.keyCode); 
  //s(keys);
}
 
//left and right by buttons
rb.onclick=function(){
  s('r click');
  if (car.x+car.width<=WIDTH) car.x+=car.turnSpeed;
  } 

lb.onclick=function(){
  s('l click');    
  if (car.x>0) car.x-=car.turnSpeed;
  }

  //speed up and down by buttons
ub.onclick=function(){
  s('u click');
  truck.speed++;
  } 

db.onclick=function(){
  s('d click');    
  truck.speed--;
  }

//POWER
pb.onclick=function(){
  s('click');
if(running) {
  running=false;
  this.value='Resume';
}
  else{ 
    running=true;
    this.value='Pause';
  }
};




//GAME
function run(){
  update();
  render();
}


//ACITON
function update(){
  
  //dashs
  dash.y+=dash.speed;
  if(dash.y>=HEIGHT) dash.y=0;


  //cars right & left
  if (keys[39]) {
      //Right
      s('right '+car.x+"|"+car.width+"|"+WIDTH);
      if (car.x+car.width<WIDTH) car.x+=car.turnSpeed;
  }
  if (keys[37]) {
      //Left
      s('left '+car.x+"|"+car.width+"|"+WIDTH);
      if (car.x>0) car.x-=car.turnSpeed;
  }

//cars up & down
  if (keys[38]) {
      //up
      s('up');
     
  }
  if (keys[40]) {
      //down
      s('down');
      
  }

  //trucks  
  // truck.y+=truck.speed;
  //     //repeate
  //     if(truck.y>=HEIGHT) {
  //       truck.y=0;
  //       truck.x=Math.random()*WIDTH;
  //     }

  isCollision=false;
  
  isCollision=collision(car,truck)[0];
  isDir=collision(car,truck)[1];
  //Collisoin
  if (isCollision) {
    s('collision!!!');
    // if (score>0) score--;

    

    // //ctxDrawer.fillStyle='yellow';
    // //ctxDrawer.fillRect(car.x,car.y,car.width,car.height);
    
    // s(isDir);
    //  //push car
    // if(isDir=='l')car.x-=40;
    // if(isDir=='r')car.x+=40;
    finished=true;


  }
  else{
    // score++;
  }
}



//DRAWING
function render(){

  //clear
  ctxDrawer.fillStyle='gray';
  ctxDrawer.fillRect(0,0,WIDTH,HEIGHT);

  // c.style.backgroundColor= 'red';

  //draw H lines
  ctxDrawer.fillStyle='black';  
  for(var h=10;h<HEIGHT;h+=10){
    //ctxDrawer.fillRect(0,h,WIDTH,1); 
  }

  //draw V lines
  ctxDrawer.fillStyle='black';  
  for(var v=10;v<WIDTH;v+=10){
    //ctxDrawer.fillRect(v,0,1,HEIGHT);
  }

 
  // ctxDrawer.fillStyle='red'; 
  // ctxDrawer.fillRect(0,0,WIDTH,1);
  // ctxDrawer.fillRect(0,HEIGHT,WIDTH,1);


  //draw dash s
  ctxDrawer.fillStyle='white';  
      for(var i=0;i<HEIGHT;i+=60){
        ctxDrawer.fillRect(dash.x,dash.y+i,dash.width,dash.height);
        ctxDrawer.fillRect(dash.x+100,dash.y+i,dash.width,dash.height);
        ctxDrawer.fillRect(dash.x+200,dash.y+i,dash.width,dash.height);
        //s(dash.y+':'+(HEIGHT));  
    }
  
  //draw car
  // ctxDrawer.fillStyle=car.color;
  // ctxDrawer.fillRect(car.x,car.y,car.width,car.height);
  var carImg=new Image();
  carImg.src="car.png";
  ctxDrawer.drawImage(carImg,car.x,car.y,car.width,car.height);

   //draw truck
  // ctxDrawer.fillStyle=truck.color;
  // ctxDrawer.fillRect(truck.x,truck.y,truck.width,truck.height);
  var truckImg=new Image();
  truckImg.src="truck.png";
  ctxDrawer.drawImage(truckImg,truck.x,truck.y,truck.width,truck.height);

  //draw score
  // ctxDrawer.fillStyle='yello';
  // ctxDrawer.fillText(score,20,20);

  ctxDrawer.font = "50px Verdana";
// Create gradient
  var gradient = ctxDrawer.createLinearGradient(0, 0, c.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  ctxDrawer.fillStyle = gradient;
  ctxDrawer.fillText(score, 100, 90);
  //ctxDrawer.fillStyle='blue';
  //ctxDrawer.fillRect(70,HEIGHT-280,20,30);


  
   

}





//FUNTIONS
function collision (c,t) {
var dir;
  // body...
  var r=[];
  r[0]=false;
  //reach up
  if (c.y<t.y+t.height) {

    if (c.x<=(t.x+t.width) && c.x>t.x) //from right   
    {
      r[0]= true;
      r[1]='r';
    }


    if ((c.x+c.width)>t.x && (c.x+c.width)<(t.x+t.width)) //from left
    {
      r[0]= true;
      r[1]='l';
    }
    
    //r[0]=false;

  }   
return r;
  }


function resetGame(){
  score=0;
  finished=false;

   //sound    
    var snd = new Audio("sound1.wav"); // buffers automatically when created
    snd.play();

    
  car.x=150;
  car.y=110;

 
  truck.x=20;
  truck.y=0;
  



  //running=true;
}
 
function s(x){
  console.log(x);
}


//LIFE

setInterval(function(){
  //while(running)  
  if(running && !finished) {
   run(); 
  }
  if(finished){
    //end game
    resetGame();
  }
},100);

/****** Test-Driven Development (TDD) *****/
// function expect(args) {
// 	return arg
// }
function tdd(){

	 // expect(add(1,1)).toEqual(2);

	 var tddLst=[]

	 var c=	{color:"red",height:30,turnSpeed:20,width:70,x:210,y:110}
	 var t={color:"black",height:45,speed:5,width:80,x:194.65104532356307,y:70}
	 var r=[];
	 r[0]= true;
     r[1]='r';
	 
	 tddLst.push('collision from right',collision (c,t)[1]);
	 s(tddLst)
	}


//TDD
tb.onclick=function(){
  s('click tdd');
 tdd();
};

/****** Test-Driven Development (TDD) *****/
