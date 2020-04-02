console.log('[Cris] Flappy Bird');

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const paddingX = window.innerWidth > 800 ? 100 : 4;
const paddingY = 4;

const debug = false;

// Screen Size
const height = (window.innerHeight+paddingY) > 600 ? 600 : (window.innerHeight-paddingY) < (480+paddingY) ? 480 : (window.innerHeight-paddingY);
const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth+paddingX) > (16/9*height) ? (16/9*height) : (window.innerWidth-paddingY)
//const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth-paddingX);
context.canvas.width =  width;
context.canvas.height = height

let screenEnabled = {};

// FUNCTIONS
import { isCollision } from "./utils/Collision.js";
import { sound } from "./utils/Sound.js";

//[Music]
const musicPath = ["../sounds/christmas_synths.mp3", "../sounds/pixel_adventures.mp3"];
//const musicPath = ["https://opengameart.org/sites/default/files/Christmas%20synths.ogg", "https://opengameart.org/sites/default/files/Pixel%20adventures.mp3"];
const music = new sound(musicPath[Math.floor(Math.random() * musicPath.length)], true);
  
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
const floor = new Floor(context, sprites, canvas, debug);

// [Pipes]
import { DoublePipe } from "./classes/DoublePipe.js";
const pipes = new DoublePipe(context, sprites, canvas, floor, debug);

// [FlappyBird]
import {FlappyBird} from "./classes/FlappyBird.js";
const flappyBird = new FlappyBird(context, sprites, canvas, debug);


// [Screens]
const Screens = {
  START: {
    speed: 0,
    startSound: new sound("../sounds/SFX_Start.wav"),
    click() {
      this.startSound.play();
      music.play();
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
  impactSound: new sound("../sounds/SFX_Impact.wav"),
  topImpactSound: new sound("../sounds/SFX_Top_Impact.wav"),
  click() {
    if(!this.stoped) {
      flappyBird.click(this.speed);
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
      if(score.getScore() % 5 === 0){
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
    this.impactSound.play();
    music.stop();
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
      this.topImpactSound.play();
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
  sleepTime: 30,
  click() {
    if(this.sleepTime > 0){
      return;
    }
    flappyBird.reset();
    pipes.reset();
    score.reset();
    Screens.GAME.reset();
    
    music.play();
    this.sleepTime = 30;
    changeToScreen(Screens.GAME)
  },
  mDraw() {
    background.mDraw();
    flappyBird.mDraw();
    pipes.mDraw();
    floor.mDraw();
    messageGameOver.mDraw();
    score.mDraw();
    this.sleepTime -= 1;
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

document.body.onkeypress = function(e){
  if(e.keyCode == 32){
    if(screenEnabled.click) {
      screenEnabled.click();
    }
  }
}

changeToScreen(Screens.START);
loop();