class FlappyBird {
    constructor(context, sprites, canvas) {
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 34;
        this.height = 24;
        this.posX = 10;
        this.posY = 50;
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.25;
        this.collisionTolerance = 3;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    click() {
        this.speedY = -5;
    }
    update(ScreenSpeed) {
        this.speedY = this.speedY + this.gravity;
        this.posY = this.posY + this.speedY;
        this.posX = this.posX + this.speedX;
    }
    reset() {
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 34;
        this.height = 24;
        this.posX = 10;
        this.posY = 50;
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.25;
        this.collisionTolerance = 3;
    }
    stop() {
        this.speedY = 0;
        this.speedX = 0;
        this.gravity = 0;
    }
    mDraw() {
        this.context.drawImage(
          this.sprites,
          this.sourceX, this.sourceY, // Sprite X, Sprite Y
          this.width, this.height, // Tamanho de recorte na Sprite
          this.posX, this.posY, // Posição na tela
          this.width, this.height // Tamanho da imagem na tela
        );
    }
}

export {FlappyBird};