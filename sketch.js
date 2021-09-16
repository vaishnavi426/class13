var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg, tree;
var t1, t2, t3, t4, t5, t6, ran, score=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImg = loadImage("cloud.png");
  
  t1 = loadImage("obstacle1.png");
  t2 = loadImage("obstacle2.png");
  t3 = loadImage("obstacle3.png");
  t4 = loadImage("obstacle4.png");
  t5 = loadImage("obstacle5.png");
  t6 = loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  var ran = Math.round(random(20,200));
  console.log(ran);
}

function draw() {
  //set background color
  background("white");
  
  //to write the score
  text("Score = "+score,500,40);
  score = score+Math.round(frameCount/100);
  
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);

  makeObstacles();
  
  makeClouds();
  
  drawSprites();
  
}

function makeClouds() {
  if(frameCount%80==0 || frameCount == 10) {
    cloud = createSprite(600,50,20,20);
    cloud.velocityX=-3;
    cloud.y = Math.round(random(50,100));
    cloud.addImage("clouds",cloudImg);
    cloud.scale = random(0.4,0.8);
    trex.depth = cloud.depth+1;
    console.log(trex.depth," , ",cloud.depth);
    cloud.lifetime = 200;
  }
}

function makeObstacles() {
  if(frameCount%60==0) {
    tree = createSprite(600,165,20,20);
    tree.velocityX= -4;
    ran= Math.round(random(1,6));
    switch(ran) {
      case 1: tree.addImage(t1);
      break;
      case 2: tree.addImage(t2);
      break;
      case 3: tree.addImage(t3);
      break;
      case 4: tree.addImage(t4);
      break;
      case 5: tree.addImage(t5);
      break;
      case 6: tree.addImage(t6);
      break;
    }
    tree.scale = 0.5;
    tree.lifetime = 150;
  }
}


