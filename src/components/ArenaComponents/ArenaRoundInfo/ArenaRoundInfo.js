export class ArenaRoundInfo{
    constructor(container){
        this.root=container;
        this.render();
    }

    render() {
        this.root.innerHTML = ArenaRoundInfo.markup();
        this.counterEl=this.root.querySelector(".round-info__counter");
    }

    updateCounter(currentRoundIndex){
        this.counterEl.textContent=currentRoundIndex;
        this.playerScoreEl = this.root.querySelector(".score-player");
        this.botScoreEl = this.root.querySelector(".score-bot");
        this.drawScoreEl = this.root.querySelector(".score-draw");
    }

    static markup(playerScore=0,botScore=0,drawScore=0) {
        return `
               <h2 class="round-info__title">Round
               <span class="round-info__counter"></span></h2>

               <div class="round-info__score">
               <div class="score">
                    <span class="score__name">Player:</span> <span class="score__value"> ${playerScore}</span>               
               </div>

               <div class="score">
                    <span class="score__name">Bot:</span> <span class="score__value"> ${botScore}</span>               
               </div>

               <div class="score">
               <span class="score__name">Draw:</span> <span class="score__value"> ${drawScore}</span>
               </div>
               </div>
        `;
    }  
    
    updateScore(score){
        this.playerScoreEl.textContent=`Player: ${score.player}`;
        this.botScoreEl.textContent=`Bot: ${score.bot}`;
        this.drawScoreEl.textContent=`Draw: ${score.draw};`
    }
}