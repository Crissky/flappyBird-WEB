export class Floor {
    constructor (context, sprites, canvas) {
        this.sourceX = 0;
        this.sourceY = 610;
        this.width = 224;
        this.height = 112;
        this.posX = 0;
        this.posY = (canvas.height - 112);
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    update(ScreenSpeed) {
        this.posX = this.posX - ScreenSpeed;
    }
    resetPosX() {
        if(this.posX < (-this.width)) {
            this.posX = this.posX + this.width;
            // console.log("Floor - resetPosX() - PosX:", this.posX);
        }
    }
    mDraw() {
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
            (this.posX + this.width*2), this.posY, // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
    }  
}