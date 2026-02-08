import { AudioPlayer } from "../../../Audio/AudioPlayer.js";
import { DisplaySwitch } from "../../../helpers/DisplaySwitch.js";
import { GameOverview } from "./GameOverview/GameOverview.js";

export class FinalResult{
    constructor(container,finalScore,finalResultText,numOfRounds,onCloseCallback){
        this.root=container;
        this.onCloseCallback=onCloseCallback;
        this.render(finalScore,finalResultText,numOfRounds);
    }

    render(score,resultText,numOfRounds){
        this.root.innerHTML=FinalResult.markup(score,resultText,numOfRounds);
        this.root.getBoundingClientRect();        
        this.root.classList.add("visible");   
        this.overviewBtn=this.root.querySelector(".game-overview-button");   
        this.closeOverlayBtn=this.root.querySelector(".close-overlay--main");  
    }

    static markup(score,resultText,numOfRounds){
        return `
            <div class="final-result__content">  
                <button class="close-overlay--main">&times;</button>
                <div class="final-result__front">
                    <h1 class="final-result__text">${resultText}</h1>
                    <button class="game-overview-button">Game Overview</button>  
                    <div class="final-result__stats">
                    <div class="stat__win">Player wins: ${score.player}/${numOfRounds}</div>
                    </div>              
                </div>      
                <div class="final-result__overview hidden"></div>

            </div>
        `;
    }

    playSound(finalResult){
        AudioPlayer.playSound(finalResult,true);
    }

    setupGameReview(gameId,roundIdList,toast){
        this.front=this.root.querySelector(".final-result__front");

        this._onOverviewButtonClick= async()=>{
            const overviewContainer=this.root.querySelector(".final-result__overview");
            this.overview=new GameOverview(overviewContainer,gameId,roundIdList,toast,()=>DisplaySwitch.showElement(this.front));  
            
            this.showOverview();
            await this.overview.renderGameReview();
        }

        this._onCloseOverlayBtnClick= ()=>{
            this.onCloseCallback();
            this.destroy();
        };
        this.overviewBtn.addEventListener("click",this._onOverviewButtonClick);
        this.closeOverlayBtn.addEventListener("click",this._onCloseOverlayBtnClick);
    }

    showOverview(){
        DisplaySwitch.hideElement(this.front);
        DisplaySwitch.showElement(this.overview.root);
    }

    destroy(){
        this.overviewBtn.removeEventListener("click",this._onOverviewButtonClick);
        this.closeOverlayBtn.removeEventListener("click",this._onCloseOverlayBtnClick);
        if(this.overview)this.overview.destroy();
        this.root.remove();
    }
}