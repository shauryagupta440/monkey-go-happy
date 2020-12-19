var monkey , monkey_running;
var banana ,bananaImage, rock, obstacleImage;
var FoodGroup, rockGroup;
var ground;
var score=0;
var PLAY;
var END;
var gameState = PLAY;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

 

function setup() {
  createCanvas(400, 400);
monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  rockGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background(255);
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  fill("black");
  textSize(20);
  stroke("black");
  text("Score : "+score,250,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time : "+survivalTime,50,50);
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    if(keyDown("space")){
    monkey.velocityY=-7;
  }
 
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(FoodGroup)){
    score=score+2
    FoodGroup.destroyEach();
  }
    
    food();
    rock();
    
    if(rockGroup.isTouching(monkey)){
      monkey.velocityY=0;
      rockGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ground.velocityX=0;
    FoodGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
      gameState=END;
      }
    
  }
  
  drawSprites();
}

function food(){
  if (frameCount % 80 === 0) {
    banana = createSprite(500, 200, 20, 20);
    banana.velocityX = -(7+(score/10));
    banana.y = Math.round(random(70, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1
    FoodGroup.add(banana);
    banana.lifetime = 600;
  }
  monkey.debug=true;
  monkey.setCollider("circle",0,0,200);
}

function rock(){
  if (frameCount % 300 === 0) {
    rocks = createSprite(400, 325, 20, 20);
    rocks.velocityX = -(7+(score/10));
    rocks.addImage(obstacleImage);
    rocks.scale = 0.1;
    rockGroup.add(rocks);
    rocks.lifetime = 600;
  }
  monkey.debug=true;
  monkey.setCollider("circle",0,0,200);
}

