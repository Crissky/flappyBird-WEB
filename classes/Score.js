export class Score {
    constructor(context, sprites, canvas) {
        this.score = -1;
        this.bestScore = 0;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    reset() {
        this.score = -1;
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
    print() {
        console.log("Score:", this.score, "Best Score:", this.bestScore);
    }
}