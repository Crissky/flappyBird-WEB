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
        
        let maxLoop = Math.ceil( (this.canvas.width / this.width)) + 1;
        for (let index = 0; index < maxLoop; index++) {
            this.context.drawImage(
                this.sprites,
                this.sourceX, this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite
                (this.posX + (this.width * index)), this.posY, // Posição na tela
                this.width, this.height // Tamanho da imagem na tela
            );        
        }
    }
    getArea() {
        return {
            x1: 0,
            x2: this.canvas.width,
            y1: this.posY,
            y2: (this.posY + this.height)
        }
    }
}