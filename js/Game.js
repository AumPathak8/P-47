class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1img);
    car2 = createSprite(300,200);
    car2.addImage(car2img);
    car3 = createSprite(500,200);
    car3.addImage(car3img);
    car4 = createSprite(700,200);
    car4.addImage(car4img);
    cars = [car1, car2, car3, car4];
    passedFinish = false;

    obstacleGroup = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

this.addSprites(obstacleGroup, obstaclePositions.length,obstacle1Image,0.03,obstaclePositions);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    //console.log(allPlayers)
    
    if(allPlayers !== undefined){

      
      background("black");
      image(trackimg, 0, -displayHeight*4,displayWidth, displayHeight * 5);

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + (index*200) + allPlayers[plr].posX
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(player.distance<3750)
    {
      if(keyIsDown(38) && player.index !== null){
        veloY += 0.9
        if(keyIsDown(37)){
          veloX -= 0.2
        }
        if(keyIsDown(39)){
          veloX += 0.2;
      } else if(keyIsDown(38) && veloY>0 && player.index!== null)
      {
        veloY -= 0.1
        veloX *= 0.9
      } else{
        veloY *= 0.98
        veloX *= 0.98
      }

      
        player.distance += veloY
        veloY *= 0.98
        player.posX += veloX
        veloX *= 0.98
        player.update();
      }

    }
     else if(passedFinish === false)
     {
      passedFinish = true;
      Player.updateCarsAtEnd();
      player.rank = CarsAtEnd;
      player.update();
     

     }

    drawSprites();
  }


end(){
 // console.log("game has ended");
 camera.position.x=0
 camera.position.y=0
 imageMode(CENTER);
 Player.getPlayerInfo();
 

 image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
 image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
 image(gold_img, 0, -100, 250, 300);

  textSize(50);
  textAlign(CENTER);
  for(var plr in allPlayers)
  {
    if(allPlayers[plr].rank === 1)
    {
      text("Rank 1:"+allPlayers[plr].name,0,85);
    }else if(allPlayers[plr].rank === 2){
      text("Rank 2:" + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
  }else if(allPlayers[plr].rank === 3){
      text("Rank 3:" + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
  }
  }
}

addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
  for (var i = 0; i < numberOfSprites; i++) {
    var x, y;

    
    if (positions.length > 0) {
      x = positions[i].x;
      y = positions[i].y;
      spriteImage = positions[i].image;
    } else {
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);
    }
    var sprite = createSprite(x, y);
    sprite.addImage("sprite", spriteImage);

    sprite.scale = scale;
    spriteGroup.add(sprite);
  }
}

}
