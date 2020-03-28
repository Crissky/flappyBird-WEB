export class Background {
    constructor (context, sprites, canvas) {
        this.sourceX = 390;
        this.sourceY = 0;
        this.width = 275;
        this.height = 204;
        this.posX = 0;
        this.posY = (canvas.height - 204);
        this.time = 1;
        this.delay = 100;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    update(ScreenSpeed) {
        this.time = this.time + 1;
        if(this.time > (this.delay / ScreenSpeed)) {
            this.posX = this.posX - 1;
            this.time = 1;
        }
      }
      resetPosX() {
        if(this.posX < (-this.width)) {
            this.posX = this.posX + this.width;
            console.log("Background - resetPosX() - PosX:", this.posX);
        }
      }
      mDraw() {
          this.context.fillStyle = '#70c5ce';
          this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
            this.resetPosX();
            this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            this.posX, this.posY, // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
        
        this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            (this.posX + this.width), this.posY, // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
    
        this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            (this.posX + (this.width*2)), this.posY, // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
      }
}