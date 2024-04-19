const canvas=document.getElementById('game');
const ctx= canvas.getContext('2d');

let speed=10;
let Count=20;
let Size=canvas.width/Count-2; //ecah rectangle size
let headX=10; //setting the snake x,y is 10
let headY=10;

const snakePart=[];

let tailSize=0; //snake size

let foodX=5;
let foodY=5;

let Speedx=0; //setting the x,y speed is 0
let Speedy=0;

let score=0;

class SnakePart{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

function startGame() { //the game main structure
    backgroundColor();
    snakePosition(); //snake postion
    let lose=isOver();
    if(lose){
        document.body.addEventListener('keydown', playAgain);
        return;
    }
  
    checkColli();
    let win=isWin(); //to deciede if it is win 

    if(win){
        return;
    }

    drawFood(); //food
    drawSnake(); //snakebody
    drawScore();// display the socre

    setSpeed(); // the snake how fast

    setTimeout(startGame, 1000/speed);

}

function snakePosition(){ //after the snake move,the new position
  headX=headX+Speedx;
  headY=headY+Speedy;
}

function isOver(){
  //如果蛇撞牆就輸
  let Over=false;
  if(headX<0 || headX==20 ||headY<0 || headY==20){
    Over=true;
  }
  for(let i=0; i< snakePart.length;i++){
    if(headX==snakePart[i].x&& headY== snakePart[i].y){
      Over=true;
    }
  }
  if(Over){
    ctx.textAlign="center";
    ctx.fillStyle="#0C4A60";
    ctx.font="50px Poppins";
    ctx.fillText("Game Over",canvas.width/2,canvas.height/2);
    ctx.font="25px Poppins";
    ctx.fillText("Press Space Bar to play again",canvas.width/2,canvas.height/2+100);
  }
  return Over;
}

function playAgain(){
  //輸了按空白鍵重新來過
  if(event.keyCode==32){
    location.reload();
  }
}

function backgroundColor() {//background color
  ctx.fillStyle='beige';
  ctx.fillRect(0,0,800,800);
  
}

function checkColli(){
  //如果蛇吃了食物分數和body+1,have sound
  if(foodX===headX && foodY === headY){
    foodX=Math.floor(Math.random()*Count);
    foodY=Math.floor(Math.random()*Count);
    
    tailSize++;
    score++;

    if(score>5 && score %2 ==0){
      speed++;
    }
    let eatSound = document.getElementById("eatSound");
    eatSound.play();
    
  }
}

function isWin(){
 //分數>10時為win
  let win=false;
  if(score== 15){
    win=true;
  }
  if(win){
    ctx.fillStyle="red";
    ctx.font= "40px Poppins";
    ctx.fillText("You Win",canvas.width/3.3, canvas.height/2)
  }
  return win;

}

  function drawFood(){
  //food
  if(foodX === headX && foodY === headY){
    foodX = Math.floor(Math.random() * Count);
    foodY = Math.floor(Math.random() * Count);
  }
  
  ctx.fillStyle= "#ED7458";
  ctx.fillRect(foodX * Count, foodY * Count, Size, Size);
}

function drawSnake(){
  //snakebody
  ctx.fillStyle="#DDC9BC";
  for(let i=0;i< snakePart.length;i++){
    let part=snakePart[i];
    ctx.fillRect(part.x * Count,part.y * Count,Size,Size);
  }

  snakePart.push(new SnakePart(headX,headY));
  if(snakePart.length>tailSize){
    snakePart.shift();
  }
  ctx.fillStyle='purple';
  ctx.fillRect(headX * Count,headY * Count,Size,Size);
}

function drawScore(){
  //setting the score style
  ctx.fillStyle="#0C4A60";
  ctx.font="20px Poppins";
  ctx.textAlign="center";
  ctx.fillText("Score: "+score, canvas.width/2,canvas.height-20);
  
}

function setSpeed(){
  //條蛇速度有幾快
  if(score==5){
    speed=10;
  }
}


//這裏要設定按鍵上下左右
document.body.addEventListener('keydown',keyDown);

function keyDown(event){
  //up
  if(event.keyCode==38){
    if(Speedy==1) return;
    Speedy=-1;
    Speedx=0;
  }

  //down
  if(event.keyCode==40){
    if(Speedy==-1) return;
    Speedy=1;
    Speedx=0;
  }
  
    //left
  if(event.keyCode==37){
    if(Speedx==1) return;
    Speedy=0;
    Speedx=-1;
  }

  //right
  if(event.keyCode==39){
    if(Speedx==-1) return;
    Speedy=0;
    Speedx=1;
  }
}



startGame();
//..

//可以加一些音效,如蛇吃東西