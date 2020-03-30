console.log('[Cris] Flappy Bird');

// VARIABLES
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Screen Size
const height = (window.innerHeight+100) > 600 ? 600 : (window.innerHeight-100) < 580 ? 480 : (window.innerHeight-100);
const width = (window.innerWidth-100) < 320 ? 320 : (window.innerWidth-100);
context.canvas.width =  width;
context.canvas.height = height

let screenEnabled = {};

// FUNCTIONS
import { isCollision } from "./libs/Collision.js";

// OBJECTS 
// [Score]
import { Score } from "./classes/Score.js";
const score = new Score(context, sprites, canvas);

// [MessageGetReady]
import { MessageGetReady } from "./classes/MessageGetReady.js";
const messageGetReady = new MessageGetReady(context, sprites, canvas);

// [MessageGameOver]
import { MessageGameOver } from "./classes/MessageGameOver.js";
const messageGameOver = new MessageGameOver(context, sprites, canvas);

// [Background]
import { Background } from "./classes/Background.js";
const background = new Background(context, sprites, canvas);

// [Floor]
import { Floor } from "./classes/Floor.js";
const floor = new Floor(context, sprites, canvas);

// [Pipes]
import { DoublePipe } from "./classes/DoublePipe.js";
const pipes = new DoublePipe(context, sprites, canvas, floor);

// [FlappyBird]
import {FlappyBird} from "./classes/FlappyBird.js";
const flappyBird = new FlappyBird(context, sprites, canvas);



// [Screens]
const Screens = {
  START: {
    speed: 0,
    click() {

      changeToScreen(Screens.GAME)
    },
    mDraw() {
      background.mDraw();
      floor.mDraw();
      flappyBird.mDraw();
      messageGetReady.mDraw();
    },
    update() {}
  }
};

Screens.GAME = {
  speed: 2,
  stoped: false,
  click() {
    if(!this.stoped) {
      flappyBird.click(this.speed);
      // console.log("Flappy PosY:", flappyBird.posY, "Flappy PosX:", flappyBird.posX)
    }
  },
  update() {
    background.update(this.speed);
    pipes.update(this.speed);
    floor.update(this.speed);
    flappyBird.update(this.speed);
    this.iscollided();
    if((pipes.pipeUPList[0].posX + pipes.pipeUPList[0].width) < 0) {
      pipes.removeFirstPipe();
      score.addScore(1);
      if(score.getScore() % 10 === 0){
        this.speed += 0.5;
        score.addLevel(1);
      }
    }
    
  },
  reset() {
    this.speed = 2;
    this.stoped = false;
  },
  stopGame() {
    console.log("Speed:", this.speed);
    screenEnabled.speed = 0;
    flappyBird.stop();
    this.stoped = true;
    
    score.print();
    
    console.log("PipeUP posX", pipes.pipeUPList[0].posX, "PipeDOWN posX", pipes.pipeDOWNList[0].posX);
    console.log("PipeUP posY", pipes.pipeUPList[0].posY, "pipeDOWN posY", pipes.pipeDOWNList[0].posY);
    changeToScreen(Screens.GAMEOVER);
  },
  mDraw() {
    background.mDraw();
    flappyBird.mDraw();
    pipes.mDraw();
    floor.mDraw();
    score.mDraw();
  },
  iscollided() {
    if(flappyBird.posY < 0) {
      flappyBird.posY = 0;
      if( flappyBird.speedY < 0) {
        flappyBird.speedY = 0;
      }
      console.log("Colisão - Bateu no Top");
    }
    
    if ( isCollision(flappyBird, floor) ) {
      flappyBird.posY = (floor.posY - flappyBird.height);
      this.stopGame();
      console.log("Colisão - Bateu no Chão");
    } else if ( isCollision(flappyBird, pipes.pipeUPList[0]) ) {
        this.stopGame();
        console.log("Colisão - Bateu no Cano de Cima");
    } else if( isCollision(flappyBird, pipes.pipeDOWNList[0]) ) {
        this.stopGame();
        console.log("Colisão - Bateu no Cano de Baixo");
    }
  }
}

Screens.GAMEOVER = {
  speed: 0,
  click() {
    flappyBird.reset();
    pipes.reset();
    score.reset();
    Screens.GAME.reset();
    
    changeToScreen(Screens.GAME)
  },
  mDraw() {
    background.mDraw();
    flappyBird.mDraw();
    pipes.mDraw();
    floor.mDraw();
    messageGameOver.mDraw();
    score.mDraw();
  },
  update() {}
}

function changeToScreen(newScreen) {
  screenEnabled = newScreen;
}

function loop() {
  screenEnabled.update();
  screenEnabled.mDraw();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(screenEnabled.click) {
    screenEnabled.click();
  }
});

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    if(screenEnabled.click) {
      screenEnabled.click();
    }
  }
}

changeToScreen(Screens.START);
loop();