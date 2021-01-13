var PLAY=1;
var END=0;
var gameState = PLAY;

var track,trackImg,player,playerImg,maska,maskImg;
var glovesa,glovesImg,handwas,handwasImg,virus19,virusImg;
var board,gameOver,gameOverImg,pointa;
var score = 0;

function preload(){

  trackImg = loadImage("track.png");
  playerImg = loadImage("player.png")
  maskImg = loadImage("mask.png");
  glovesImg = loadImage("gloves.png");
  handwasImg = loadImage("handwas.png");
  virusImg = loadImage("virus.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  
   pointa = loadSound("point.'mp3'.wav");
  gameoverSound = loadSound("gameOver.wav")
  
}

function setup() {
  createCanvas(600, 400);
  
  track = createSprite(200,200);
  track.addImage(trackImg)
  
  
  player = createSprite(100,150);
  player.addImage("player",playerImg);
  player.scale = 0.15;
  
  board = createSprite(400,50,100,50);
  board.shapeColor = "white";
  
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,280);
  restart.addImage(restartImg);
  restart.scale = 0.2
 
  maskaGroup = new Group();
  glovesGroup = new Group();
  handwasG = new Group();
  virusG = new Group();
  
  
 

  
  
}

function draw() {
  background("white");
  //text("Score: "+ score, 400,50);
  if(gameState === PLAY)
{
  
  if(track.x<80){
  track.x = track.width/2;
}
  track.velocityX = -3;
  player.y = World.mouseY;
  
 restart.visible = false;
  
  mask();
  gloves();
  handwash();
  virus();
  
  gameOver.visible = false;
  
 if(maskaGroup.isTouching(player)){
    maskaGroup.destroyEach();
   pointa.play();
   score = score+5;
  }
  if(glovesGroup.isTouching(player)){
    glovesGroup.destroyEach();
    pointa.play();
    score = score+10;
  }
  
  if(handwasG.isTouching(player)){
    handwasG.destroyEach();
    pointa.play();
    score = score+15;
  }
  
  if(virusG.isTouching(player)){
     gameState = END;
     gameoverSound.play();
   }
}
   if(gameState===END){
    track.velocityX=0;
    virusG.setVelocityEach(0);
    glovesGroup.setVelocityEach(0);
    maskaGroup.setVelocityEach(0);
    handwasG.setVelocityEach(0);
     
     restart.visible = true;
     virusG.setLifetimeEach(-1);
     
     gameOver.visible = true;
     
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
  


 drawSprites()
  
 fill("black")
 textSize(20);
 text("Score: "+ score, 360,60);
}
   
 

function mask(){
  if(frameCount%80===0)
 {
    maska = createSprite(600,100);
   maska.addImage(maskImg);
   maska.scale = 0.15;
    maska.velocityX = -3;
   
   maska.y = Math.round(random(100,300))
   maskaGroup.add(maska);
 }
}
function gloves(){
 if(frameCount%80===0){
 glovesa = createSprite(600,100);
 glovesa.addImage(glovesImg);
 glovesa.scale = 0.05;
   
 glovesa.velocityX = -3;
   
 glovesa.y = Math.round(random(100,300))
   
  glovesGroup.add(glovesa);
 }
}

function handwash(){
  if(frameCount%60===0){
    handwas = createSprite(600,100);
    handwas.addImage(handwasImg);
    handwas.scale = 0.05;
    handwas.velocityX = -3;
    
    handwas.y = Math.round(random(100,300))
    handwasG.add(handwas);
  }
}
 
function virus(){
   if(frameCount%60===0)
 {
  virus19 = createSprite(600,100);
  virus19.addImage(virusImg);
  virus19.scale = 0.2;
  virus19.velocityX = -8
  virus19.lifetime  = 120;
   
  virusG.add(virus19); 
   
   virus19.y = Math.round(random(100,300))
 }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  maskaGroup.destroyEach();
  glovesGroup .destroyEach();
  handwasG.destroyEach();
  virusG.destroyEach();
  
  score = 0;
  
}
  
  