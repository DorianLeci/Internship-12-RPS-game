import { getAllRounds } from "../../../../api/api.js";
import { moveImages } from "../../../../helpers/MoveImages.js";
import { ApiErrorHelper } from "../../../../helpers/ApiErrorHelper.js";
import { DisplaySwitch } from "../../../../helpers/DisplaySwitch.js";


export class GameOverview{
    constructor(container,gameId,roundIdList,toast,onCloseCallback){
        this.root=container;
        this.gameId=gameId;
        this.roundIdList=roundIdList;
        this.toast=toast;
        this.onCloseCallback=onCloseCallback;
    }

    async renderGameReview(){
        try{
            const rounds=await getAllRounds(this.gameId,this.roundIdList);

            if(!rounds || rounds.length===0){
                this.root.innerHTML=`<p>No rounds to display</p>`;
                return;
            }

            this.render(rounds);
            this.addEventListeners();
        }
        catch(error){
            await ApiErrorHelper.handleApiError(error,async (msg)=>await this.toast.showToast(msg));  
        }
    }

    render(rounds){
        this.root.innerHTML=`
            <button class="close-overlay">&times;</button>
            <ul class="overview-list">
                ${rounds.map((round,i)=>`
                    <li>
                        <div class="round-number">
                            <span>Round: ${i+1} | ${round.data.result}</span>
                        </div>
                        <div class="move-container">
                        <div class="player-move">
                            <span>Player: </span>
                            <img src="${moveImages[round.data.playerMove]}" alt="${moveImages[round.data.playerMove]}"}/>
                        </div>
                        <div class="bot-move">
                            <span>Bot: </span>
                            <img src="${moveImages[round.data.botMove]}" alt="${moveImages[round.data.botMove]}"}/>
                        </div>                                            
                        </div>
                        
                    </li>
                    `).join("")}

            </ul>
        `
    }    

    addEventListeners(){
        this.closeOverlayBtn=this.root.querySelector(".close-overlay");

        this._onButtonClick=()=>{
            DisplaySwitch.hideElement(this.root);
            this.onCloseCallback();
        };

        this.closeOverlayBtn.addEventListener("click",this._onButtonClick);
    }

    destroy(){
        this.closeOverlayBtn.removeEventListener("click",this._onButtonClick);
    }
}