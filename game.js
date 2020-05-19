console.log('[Cris] Flappy Bird');

// VARIABLES
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let screenEnabled = {};

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
      messageGetReady.sourceX, messageGetReady.sourceY, // Sprite X, Sprite Y
      messageGetReady.width, messageGetReady.height, // Tamanho de recorte na Sprite
      messageGetReady.posX, messageGetReady.posY, // Posição na tela
      messageGetReady.width, messageGetReady.height // Tamanho da imagem na tela
    );
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
  mDraw() {
    context.fillStyle = '#70c5ce'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.drawImage(
      sprites,
      background.sourceX, background.sourceY, // Sprite X, Sprite Y
      background.width, background.height, // Tamanho de recorte na Sprite
      background.posX, background.posY, // Posição na tela
      background.width, background.height // Tamanho da imagem na tela
    );
    
    context.drawImage(
      sprites,
      background.sourceX, background.sourceY, // Sprite X, Sprite Y
      background.width, background.height, // Tamanho de recorte na Sprite
      (background.posX + background.width), background.posY, // Posição na tela
      background.width, background.height // Tamanho da imagem na tela
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
  mDraw() {
    context.drawImage(
      sprites,
      floor.sourceX, floor.sourceY, // Sprite X, Sprite Y
      floor.width, floor.height, // Tamanho de recorte na Sprite
      floor.posX, floor.posY, // Posição na tela
      floor.width, floor.height // Tamanho da imagem na tela
    );
    
    context.drawImage(
      sprites,
      floor.sourceX, floor.sourceY, // Sprite X, Sprite Y
      floor.width, floor.height, // Tamanho de recorte na Sprite
      (floor.posX + floor.width), floor.posY, // Posição na tela
      floor.width, floor.height // Tamanho da imagem na tela
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
  update() {
    if(flappyBird.speedY < 1) {
      flappyBird.speedY = flappyBird.speedY + 0.1;
    }
    flappyBird.speedY = flappyBird.speedY + flappyBird.gravity;
    flappyBird.posX = flappyBird.posX + flappyBird.speedX;
    flappyBird.posY = flappyBird.posY + flappyBird.speedY;
  },
  mDraw() {
    //flappyBird.update();
    context.drawImage(
      sprites,
      flappyBird.sourceX, flappyBird.sourceY, // Sprite X, Sprite Y
      flappyBird.width, flappyBird.height, // Tamanho de recorte na Sprite
      flappyBird.posX, flappyBird.posY, // Posição na tela
      flappyBird.width, flappyBird.height // Tamanho da imagem na tela
    );
  }
}

// [Screens]
const Screens = {
  START: {
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
  click() {
    flappyBird.speedY = -6
  },
  mDraw() {
    background.mDraw();
    floor.mDraw();
    flappyBird.mDraw();
  },
  update(){
    flappyBird.update();
  }
}

function changeToScreen(newScreen) {
  screenEnabled = newScreen;
}

function loop() {
  screenEnabled.update();
  screenEnabled.mDraw();

  requestAnimationFrame(loop);
}

window.addEventListener('mousedown', function() {
  if(screenEnabled.click) {
    screenEnabled.click();
  }
});

changeToScreen(Screens.START);
loop();
