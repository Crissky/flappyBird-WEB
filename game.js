console.log('[Cris] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// [Backgroud]
const backgroud = {
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
      backgroud.sourceX, backgroud.sourceY, // Sprite X, Sprite Y
      backgroud.width, backgroud.height, // Tamanho de recorte na Sprite
      backgroud.posX, backgroud.posY, // Posição na tela
      backgroud.width, backgroud.height // Tamanho da imagem na tela
    );
    
    context.drawImage(
      sprites,
      backgroud.sourceX, backgroud.sourceY, // Sprite X, Sprite Y
      backgroud.width, backgroud.height, // Tamanho de recorte na Sprite
      (backgroud.posX + backgroud.width), backgroud.posY, // Posição na tela
      backgroud.width, backgroud.height // Tamanho da imagem na tela
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
  mDraw() {
    context.drawImage(
      sprites,
      flappyBird.sourceX, flappyBird.sourceY, // Sprite X, Sprite Y
      flappyBird.width, flappyBird.height, // Tamanho de recorte na Sprite
      flappyBird.posX, flappyBird.posY, // Posição na tela
      flappyBird.width, flappyBird.height // Tamanho da imagem na tela
    );
  }
}

function loop() {
  backgroud.mDraw();
  floor.mDraw();
  flappyBird.mDraw();

  requestAnimationFrame(loop);
}

loop();