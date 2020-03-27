console.log('[Cris] Flappy Bird');

// VARIABLES
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let screenEnabled = {};

let score = -1;
let bestScore = 0;

// OBJECTS 
// [MessageGetReady]
const messageGetReady = {
  sourceX: 134,
  sourceY: 0,
  width: 174,
  height: 152,
  posX: (canvas.width / 2) - 174 / 2,
  posY: 50,
  mDraw() {
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }
}

// [MessageGetReady]
const messageGameOver = {
  sourceX: 153,
  sourceY: 153,
  width: 188,
  height: 38,
  posX: (canvas.width / 2) - 174 / 2,
  posY: 50,
  mDraw() {
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }
}

// [PipeUP]
const pipeUP = {
  sourceX: 52,
  sourceY: 169,
  width: 52,
  height: 400,
  posX: -100,
  posY: 0,
  mDraw() {
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }
}

// [PipeDOWN]
const pipeDOWN = {
  sourceX: 0,
  sourceY: 169,
  width: 52,
  height: 400,
  posX: -100,
  posY: 0,
  mDraw() {
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }
}

// [Pipes]
const pipes = {
  headSize: 25,
  spaceBetween: 100,
  numPipeSpeedUp: 10,
  getMinPosY() {
    return (pipes.headSize);
  },
  getMaxPosY() {
    return (canvas.height - floor.height - pipes.headSize - this.spaceBetween);
  },
  getRandomPosY() {
    min = this.getMinPosY();
    max = this.getMaxPosY();
    min = Math.ceil(min);
    max = Math.floor(max);
    result = Math.floor(Math.random() * (max - min)) + min;
    result = result - pipeUP.height;
    // console.log("PIPEs getRandomPosY() - ","Mínimo:", min, "Máximo:", max, "Resultado:", result);
  
    return result;
  },
  spawn() {
    pipeUP.posX = canvas.width;
    pipeDOWN.posX = canvas.width;
    pipeUP.posY = this.getRandomPosY();
    pipeDOWN.posY = pipeUP.posY + pipeUP.height + this.spaceBetween;
    score = score + 1
    if(score % this.numPipeSpeedUp === 0 && score != 0){
      screenEnabled.speed += 1
    }
    console.log("Score:", score, "Speed:", screenEnabled.speed);
  },
  update() {
    pipeUP.posX = pipeUP.posX - screenEnabled.speed;
    pipeDOWN.posX = pipeDOWN.posX - screenEnabled.speed;
  },
  mDraw() {
    if(pipeUP.posX < (0 - pipeUP.width)) {
      this.spawn();
    }
    pipeUP.mDraw();
    pipeDOWN.mDraw();
  }
  
}

// [Background]
const background = {
  sourceX: 390,
  sourceY: 0,
  width: 275,
  height: 204,
  posX: 0,
  posY: (canvas.height - 204),
  time: 1,
  delay: 100,
  update() {
    this.time = this.time + 1;
    if(this.time > (this.delay / screenEnabled.speed)) {
      this.posX = this.posX - 1;
      this.time = 1;
    }
  },
  resetPosX() {
    if(this.posX < (-this.width)) {
      this.posX = this.posX + this.width;
      console.log("Background - resetPosX() - PosX:", this.posX);
    }
  },
  mDraw() {
    context.fillStyle = '#70c5ce'
    context.fillRect(0, 0, canvas.width, canvas.height)

    this.resetPosX();
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
    
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      (this.posX + this.width), this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );

    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      (this.posX + (this.width*2)), this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }  
}

// [Floor]
const floor = {
  sourceX: 0,
  sourceY: 610,
  width: 224,
  height: 112,
  posX: 0,
  posY: (canvas.height - 112),
  update() {
    this.posX = this.posX - screenEnabled.speed;
  },
  resetPosX() {
    if(this.posX < (-this.width)) {
      this.posX = this.posX + this.width;
      // console.log("Floor - resetPosX() - PosX:", this.posX);
    }
  },
  mDraw() {
    this.resetPosX();
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
    
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      (this.posX + this.width), this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );

    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      (this.posX + this.width*2), this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }  
}

// [FlappyBird]
const flappyBird = {
  sourceX: 0,
  sourceY: 0,
  width: 34,
  height: 24,
  posX: 10,
  posY: 50,
  speedX: 0,
  speedY: 1,
  gravity: 0.25,
  collisionTolerance: 3,
  update() {
    this.speedY = this.speedY + this.gravity;
    this.posY = this.posY + this.speedY;
    this.posX = this.posX + this.speedX;
  },
  mDraw() {
    //flappyBird.update();
    context.drawImage(
      sprites,
      this.sourceX, this.sourceY, // Sprite X, Sprite Y
      this.width, this.height, // Tamanho de recorte na Sprite
      this.posX, this.posY, // Posição na tela
      this.width, this.height // Tamanho da imagem na tela
    );
  }
}

// [Screens]
const Screens = {
  START: {
    speed: 0,
    click() {

      changeToScreen(Screens.GAME)
    },
    mDraw() {
      background.mDraw();
      pipes.mDraw();
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
      flappyBird.speedY = -5
      // console.log("Flappy PosY:", flappyBird.posY, "Flappy PosX:", flappyBird.posX)
    }
  },
  mDraw() {
    background.mDraw();
    pipes.mDraw();
    floor.mDraw();
    flappyBird.mDraw();
  },
  update() {
    this.iscollided();
    background.update();
    pipes.update();
    floor.update();
    flappyBird.update();
  },
  iscollided() {
    if(flappyBird.posY < 0) {
      flappyBird.posY = 0;
      if( flappyBird.speedY < 0) {
        flappyBird.speedY = 0;
      }
      console.log("Colisão - Bateu no Top");
    } else if (flappyBird.posY > (floor.posY - flappyBird.height)) {
      flappyBird.posY = (floor.posY - flappyBird.height);
      this.stopGame();

      console.log("Colisão - Bateu no Chão");
    } else if ( (flappyBird.posX + flappyBird.width - flappyBird.collisionTolerance) > pipeUP.posX && (flappyBird.posX + flappyBird.collisionTolerance) < (pipeUP.posX + pipeUP.width) ) {
      if( (flappyBird.posY + flappyBird.collisionTolerance) < (pipeUP.posY + pipeUP.height) ) {
        this.stopGame();

        console.log("Colisão - Bateu no Cano de Cima");
      } else if((flappyBird.posY + flappyBird.height - flappyBird.collisionTolerance) > pipeDOWN.posY) {
        this.stopGame();

        console.log("Colisão - Bateu no Cano de Baixo");
      }
    } 
  },
  stopGame() {
    screenEnabled.speed = 0;
    flappyBird.speedY = 0;
    flappyBird.speedX = 0;
    flappyBird.gravity = 0;
    this.stoped = true;
    if(score > bestScore) {
      bestScore = score;
    }
    console.log("Score:", score, "Best Score:", bestScore);
    console.log("PipeUP posX", pipeUP.posX,"PipeDOWN posX", pipeDOWN.posX);
    console.log("PipeUP posY", pipeUP.posY,"PipeDOWN posY", pipeDOWN.posY);
    changeToScreen(Screens.GAMEOVER);
  }
}

Screens.GAMEOVER = {
  speed: 0,
  click() {
    flappyBird.posX = 10;
    flappyBird.posY = 50;
    flappyBird.speedY = 0;
    flappyBird.speedX = 0;
    flappyBird.gravity = 0.25;
    pipeUP.posX = -100;
    pipeDOWN.posX = -100;
    score = -1;
    
    Screens.GAME.speed = 2;
    Screens.GAME.stoped = false;
    changeToScreen(Screens.GAME)
  },
  mDraw() {
    background.mDraw();
    pipes.mDraw();
    floor.mDraw();
    flappyBird.mDraw();
    messageGameOver.mDraw();
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

changeToScreen(Screens.START);
loop();

// updatePosY() {
//   this.posY = this.posY + this.speedY;
//   if(this.posY < 0) {
//     this.posY = 0;
//     this.speedY = 0;
//   }
//   else if(this.posY > (floor.posY - this.height)) {
//     this.posY = (floor.posY - this.height);
//   }
// },
