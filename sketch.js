var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.25
  ghost.debug = true;
  ghost.setCollider("circle", 0, 0, 100)

  spookySound.play()
  


  
}

function draw() {
  background(200);

  if (gameState === "play") {
    if(tower.y > 400){
      tower.y = 300
    
  }

  if (keyDown("Up")) {
    ghost.velocityY = -5
    
    
  }
  ghost.velocityY += 0.8;

  if (keyDown("Left")) {
    ghost.x -= 3 
    
  }
  if (keyDown("Right")) {
    ghost.x += 3 
    
  }

  if (ghost.isTouching(climbersGroup)) {
    ghost.velocityY = 0

    
  }

  if (ghost.isTouching(invisibleBlockGroup)) {
    gameState = "End"
    ghost.visible = false;

    
  }

  

  SpawnDoor();
  drawSprites();
    
  }
  if (gameState === "End") {
    stroke("white")
    fill("white")
    textSize(30)
    text("Game Over!", 230, 250)
    text("Click Space to Restart!", 180, 290)

    if (keyDown("Space")) {
      gameState = "play"
      ghost.visible = true;
      ghost.x = 200
      ghost.y = 200
      
    }

    
  }
  
  
}


function SpawnDoor() {
  if (frameCount%240 == 0) {
    door = createSprite(Math.round(random(120, 400)), 0);
    door.addImage("door", doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    door.depth = 1;
    ghost.depth = 1;
    ghost.depth++

    climber = createSprite(door.x, 50)
    climber.addImage("climber", climberImg)
    climber.width = 50;
    climber.debug = true;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(climber.x, 65)
    invisibleBlock.height = 2;
    invisibleBlock.width = climber.width;
    invisibleBlock.visible = false;
    invisibleBlock.debug = true;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800
    invisibleBlockGroup.add(invisibleBlock)


    
    
    
  }
  
}
