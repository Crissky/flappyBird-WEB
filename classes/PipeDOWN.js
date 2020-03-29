export class PipeDOWN {
    constructor(context, sprites, canvas) {
        this.sourceX = 0;
        this.sourceY = 169;
        this.width = 52;
        this.height = 400;
        this.posX = -100;
        this.posY = 0;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    reset() {
        this.sourceX = 0;
        this.sourceY = 169;
        this.width = 52;
        this.height = 400;
        this.posX = -100;
        this.posY = 0;
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
    getArea() {
        return {
            x1: this.posX,
            x2: (this.posX + this.width),
            y1: this.posY,
            y2: (this.posY + this.height)
        }   
    }
}