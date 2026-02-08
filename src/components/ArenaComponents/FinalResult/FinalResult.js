import { AudioPlayer } from "../../../Audio/AudioPlayer.js";
import { DisplaySwitch } from "../../../helpers/DisplaySwitch.js";
import { GameOverview } from "./GameOverview/GameOverview.js";

export class FinalResult{
    constructor(container,finalScore,finalResultText){
        this.root=container;
        this.render(finalScore,finalResultText);
    }

    render(score,resultText){
        this.root.innerHTML=FinalResult.markup(score,resultText);
        this.root.getBoundingClientRect();        
        this.root.classList.add("visible");   
        this.overviewBtn=this.root.querySelector(".game-overview-button");     
    }

    static markup(score,resultText){
        return `
            <div class="final-result__content">  
                <div class="final-result__front">
                    <h1 class="final-result__text">${resultText}</h1>
                    <button class="game-overview-button">Game Overview</button>                
                </div>      
                <div class="final-result__overview hidden"></div>

            </div>
        `;
    }

    playSound(finalResult){
        AudioPlayer.playSound(finalResult,true);
    }

    setupGameReview(gameId,roundIdList,toast){
        const front=this.root.querySelector(".final-result__front");

        this._onButtonClick= async()=>{
            const overviewContainer=this.root.querySelector(".final-result__overview");
            this.overview=new GameOverview(overviewContainer,gameId,roundIdList,toast,()=>DisplaySwitch.showElement(front));  
            
            DisplaySwitch.hideElement(front);
            DisplaySwitch.showElement(this.overview.root);
            await this.overview.renderGameReview();
        }

        this.overviewBtn.addEventListener("click",this._onButtonClick);
    }
}