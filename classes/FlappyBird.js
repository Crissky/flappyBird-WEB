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
        this.gravity = 0.2;
        this.collisionTolerance = 4;
        this.maxDegree = 15;
        this.currentDegree = 0;
        this.incrementDegree = (15/4);
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
        this.currentFrame = 0;
        this.maxFrames = 3;
        this.delayFrame = 20;
        this.currentTimeFrame = 0;
        this.defaultSourceY = 26;
    }
    click(ScreenSpeed) {
        this.speedY = -5 - (ScreenSpeed * 0.40);
    }
    update(ScreenSpeed) {
        this.speedY = this.speedY + this.gravity + (ScreenSpeed * 0.05);
        this.posY = this.posY + this.speedY;
        this.posX = this.posX + this.speedX;
        
        this.updateFrame(ScreenSpeed);
        if(this.speedY < 0){
            this.updateFrame(ScreenSpeed);
        }
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
        if(this.speedY < 0 && this.currentDegree > this.maxDegree * (-1)){
            this.currentDegree = this.currentDegree - this.incrementDegree;
        } else if(this.speedY > 0 && this.currentDegree < this.maxDegree){
            this.currentDegree = this.currentDegree + this.incrementDegree;
        }
        this.context.save();
        this.context.translate( (this.posX + (this.width / 2) ), ( this.posY + (this.height / 2) ) );
        this.context.rotate ((Math.PI / 180) * this.currentDegree);
        this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            (this.width / 2)*(-1), (this.height / 2)*(-1), // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
        this.context.restore();
        
    }
    updateFrame(ScreenSpeed){
        this.currentTimeFrame = ++this.currentTimeFrame % Math.ceil(this.delayFrame / ScreenSpeed);
        if(this.currentTimeFrame === 0){
            this.currentFrame = ++this.currentFrame % this.maxFrames;
            this.sourceY = this.currentFrame * this.defaultSourceY;
        }
    }
    getArea() {
        return {
            x1: ( this.posX + this.collisionTolerance ),
            x2: ( (this.posX + this.width) - this.collisionTolerance ),
            y1: ( this.posY + this.collisionTolerance ),
            y2: ( (this.posY + this.height) - this.collisionTolerance )
        }
    }
}

export {FlappyBird};