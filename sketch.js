var canvas, backgroundImage;
var CarsAtEnd = 0;
var passedFinish;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var veloX=0
var veloY=0

var form, player, game;

var cars, car1, car2, car3, car4;
var car1img,car2img,car3img,car4img,trackimg;
var gold_img,bronze_img,silver_img;
var obstacle1Image,obstacle2Image,obstacleGroup;

function preload(){

  trackimg = loadImage("images/track.jpg");
  car1img = loadImage("images/car1.png");
  car2img = loadImage("images/car2.png");
  car3img = loadImage("images/car3.png");
  car4img = loadImage("images/car4.png");
  bronze_img = loadImage("images/bronze.png");
  silver_img = loadImage("images/silver.png");
  gold_img = loadImage("images/gold.png");
  obstacle1Image = loadImage("images/obstacle1.png");
  obstacle2Image = loadImage("images/obstacle2.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  if(playerCount === 4 && CarsAtEnd === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
   if(CarsAtEnd === 3)
   {
     gameState = 2
   }
  if(gameState === 2 && CarsAtEnd === 3){
    game.end();
  }


}
