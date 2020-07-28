var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;

function preload(){
  //scoreSound = loadSound('score.mp3');
  //wall_hitSound = loadSound('wall_hit.mp3');
  //hitSound = loadSound('hit.mp3');
  player1 = loadImage("Tennis player 1.jpg")
  player1.scale = 0.5
  player2 = loadImage("Tennis player 2.jpg")
  player2.scale = 0.5
   ball1 = loadImage("tennis ball.png")
   
}

function setup() {
  
createCanvas(400,400);

//create a user paddle sprite
userPaddle = createSprite(200,70,10,70);
userPaddle.addImage(player1)


//create a computer paddle sprite
computerPaddle = createSprite(200,370,10,70);
computerPaddle.addImage(player2)
bg = loadImage("tennis court.png")

//create the pong bal
ball = createSprite(200,200,12,12);
 ball.addImage(ball1)
ball.scale = 0.05
computerScore = 0;
playerScore = 0;
gameState = "serve";


}

function draw() {  
  //fill the computer screen with white color
 edges =  createEdgeSprites();

  background(bg);
 createEdgeSprites();
  //display Scores
  text(computerScore,170,20);
  text(playerScore, 230,20);
  userPaddle.scale = 0.3;
  computerPaddle.scale = 0.3;

  //draw dotted lines
  // for (var i = 0; i < 400; i+=20) {
  //    line(200,i,200,i+10);
  // }

  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }

  if (gameState === "over") {
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }




  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (touches.length>0 || keyDown("space") && gameState == "serve") {

    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
    touches=[];

  }

  //make the userPaddle move with the mouse
  userPaddle.x = World.mouseX;
  ball.bounceOff(userPaddle)


  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    //hitSound.play();
    ball.y = ball.y - 5;
    ball.velocityY = -ball.velocityY;
  }


  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    //hitSound.play();
    ball.y = ball.y - 5;
    ball.velocityY= -ball.velocityY;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.y> 400 || ball.y < 0){
    //scoreSound.play();

  if (ball.y < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  // if (ball.isTouching(edges[1])|| ball.isTouching(edges[4])) {
  //   ball.bounceOff(edges[1]);
  //   ball.bounceOff(edges[4]);
    //wall_hitSound.play();
//}
  if (ball.isTouching(edges[0])|| ball.isTouching(edges[1])) {
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    //wall_hitSound.play();
  }

  if(computerScore>2){
    ball.velocityY= ball.velocityY + 2;
  }

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.x = ball.x;
  drawSprites();
}
