import { matchResult } from "../../../Enums/MatchResult.js";

export class ArenaRoundInfo{
    constructor(container,score){
        this.root=container;
        this.render(score);
    }

    render(score) {
        this.root.innerHTML = ArenaRoundInfo.markup(score);
        this.counterEl=this.root.querySelector(".round-info__counter");
    }

    updateCounter(currentRoundIndex){
        this.counterEl.textContent=currentRoundIndex+1;
        this.playerScoreValue = this.root.querySelector(".score-player .score__value")
        this.botScoreValue = this.root.querySelector(".score-bot .score__value")
        this.drawScoreValue = this.root.querySelector(".score-draw .score__value")
    }

    static markup(score) {
        return `
               <h2 class="round-info__title">Round
               <span class="round-info__counter"></span></h2>

               <div class="round-info__score">
               <div class="score score-player">
                    <span class="score__name">Player:</span> <span class="score__value"> ${score.player}</span>               
               </div>

               <div class="score score-bot">
                    <span class="score__name">Bot:</span> <span class="score__value"> ${score.bot}</span>               
               </div>

               <div class="score score-draw">
               <span class="score__name">Draw:</span> <span class="score__value"> ${score.draw}</span>
               </div>
               </div>
        `;
    }  
    
    updateScore(score,winner){
        switch(winner){
            case matchResult.PLAYER_WIN:
                this.animateScore(this.playerScoreValue,score.player);
                break;
            
            case matchResult.BOT_WIN:
                this.animateScore(this.botScoreValue,score.bot);
                break;

            case matchResult.DRAW:
                this.animateScore(this.drawScoreValue,score.draw);
                break;
        }
    }

    animateScore(element,newValue){
        element.textContent=newValue;
        element.classList.add("score-up");

        setTimeout(()=>element.classList.remove("score-up"),1000);
    }
}