import { fetchRound } from "../../api/api.js";
import { BotSide } from "../BotSide/BotSide.js";
import { PlayerSide } from "../PlayerSide/PlayerSide.js";

export class Arena{
    constructor(game,arenaElement){
        this.game=game;        
        this.arenaElement=arenaElement;
        this.init();
    }

    init(){
        this.playerSide=new PlayerSide(this.arenaElement.querySelector(".player-side"));
        this.botSide=new BotSide(this.arenaElement.querySelector(".bot-side"));
        this.addEventListeners();
    }

    async playRound(playerChoice){

        const roundId=this.game.roundIdList[this.currentRoundIndex];

        const currentRound=await fetchRound(roundId);

        if(!currentRound) return;
    }

    addEventListeners(){
        this.playerSide.root.addEventListener("playerChoice",async (e)=>await this.playRound(e.detail));
    }    


}