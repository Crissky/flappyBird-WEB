export class Score {
    constructor(context, sprites, canvas) {
        context.font = '900 18px Arial';
        context.textAlign = 'end';
        this.posX = 10;
        this.posY = 20;
        this.score = 0;
        this.bestScore = 0;
        this.level = 1;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    reset() {
        this.score = 0;
        this.level = 1;
    }
    mDraw() {
        this.context.fillStyle = '#ffffff';
        this.context.fillText( ("Score: " + this.score), this.canvas.width - this.posX, this.posY );
        this.context.strokeText( ("Score: " + this.score), this.canvas.width - this.posX, this.posY );
        
        this.context.fillStyle = '#fde217';
        this.context.fillText( ("Best: " + this.bestScore), this.canvas.width - this.posX, (this.posY + 20) );
        this.context.strokeText( ("Best: " + this.bestScore), this.canvas.width - this.posX, (this.posY + 20) );
        
        this.context.fillStyle = '#BB8FCE';
        this.context.fillText( ("Level: " + this.level), this.canvas.width - this.posX, (this.posY + 40) );
        this.context.strokeText( ("Level: " + this.level), this.canvas.width - this.posX, (this.posY + 40) );
        
    }
    getScore() {
        let score = 0;
        if(this.score > 0) {
            score = this.score;
        }

        return score;
    }
    getBestScore() {
        return this.bestScore;
    }
    addScore(xScore) {
        xScore = Math.floor(xScore)
        if(xScore > 0) {
            this.score = this.score + xScore;
        } else {
            this.score = this.score + 1;
        }

        if(this.score > this.bestScore) {
            this.bestScore = this.score;
        }
        this.print();
    }
    addLevel(xLevel) {
        xLevel = Math.floor(xLevel)
        if(xLevel > 0) {
            this.level = this.level + xLevel;
        } else {
            this.level = this.level + 1;
        }

        this.print();
    }
    print() {
        console.log("Score:", this.score, "Best Score:", this.bestScore, "Level: ", this.level);
    }
}