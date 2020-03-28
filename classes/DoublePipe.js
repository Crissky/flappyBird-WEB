import { PipeUP } from "./PipeUP.js";
import { PipeDOWN } from "./PipeDOWN.js";

export class DoublePipe {
    constructor(context, sprites, canvas, floor) {
        this.headSize = 25;
        this.spaceBetween = 100;
        this.numPipeSpeedUp = 10;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
        this.pipeUP = new PipeUP(context, sprites, canvas);
        this.pipeDOWN = new PipeDOWN(context, sprites, canvas);
        this.floor = floor;
    }
    getMinPosY() { // Menor Posição do Cano Superior
        return this.headSize;
    }
    getMaxPosY() { // Maior Posição do Cano Superior
        return (this.canvas.height - this.floor.height - this.headSize - this.spaceBetween);
    }
    getRandomPosY() {
        let min = this.getMinPosY();
        let max = this.getMaxPosY();
        min = Math.ceil(min);
        max = Math.floor(max);
        let result = Math.floor(Math.random() * (max - min)) + min;
        result = result - this.pipeUP.height;
        // console.log("PIPEs getRandomPosY() - ","Mínimo:", min, "Máximo:", max, "Resultado:", result);
      
        return result;
    }
    spawn() {
        this.pipeUP.posX = this.canvas.width;
        this.pipeDOWN.posX = this.canvas.width;
        this.pipeUP.posY = this.getRandomPosY();
        this.pipeDOWN.posY = this.pipeUP.posY + this.pipeUP.height + this.spaceBetween;
    }
    update(ScreenSpeed) {
        this.pipeUP.posX = this.pipeUP.posX - ScreenSpeed;
        this.pipeDOWN.posX = this.pipeUP.posX;
    }
    reset() {
        this.pipeUP.reset();
        this.pipeDOWN.reset();
    }
    mDraw() {
        this.pipeUP.mDraw();
        this.pipeDOWN.mDraw();
    }
}