import { fetchRound } from "../../../api/api.js";
import { ArenaRoundInfo } from "../ArenaRoundInfo/ArenaRoundInfo.js";
import { BotSide } from "../BotSide/BotSide.js";
import { PlayerSide } from "../PlayerSide/PlayerSide.js";
import { RoundTimer } from "../RoundTimer/RoundTimer.js";

export class Arena{
    constructor(game,arenaElement){
        this.game=game;        
        this.arenaElement=arenaElement;
        this.init();
    }

    init(){
        this.playerSide=new PlayerSide(this.arenaElement.querySelector(".player-side"));

        this.botSide=new BotSide(this.arenaElement.querySelector(".bot-side"));

        this.roundTimer=new RoundTimer(this.arenaElement.querySelector(".round-timer"));
        this.roundTimer.start();

        this.arenaRoundInfo=new ArenaRoundInfo(this.arenaElement.querySelector(".arena__round-info"));
        this.arenaRoundInfo.updateCounter(this.game.currentRoundIndex);

        this.addEventListeners();
    }

    async playRound(playerChoice){

        const roundId=this.game.roundIdList[this.game.currentRoundIndex];

        const currentRound=await fetchRound(roundId);

        if(!currentRound) return;
    }

    addEventListeners(){
        this.playerSide.root.addEventListener("playerChoice",async (e)=>{
            this.roundTimer.stop();

            const move=e.detail;
            await this.playRound(move);
        });
        this.roundTimer.root.addEventListener("timerFinished",async (e)=>{
            const move=e.detail;
            await this.playRound(move);

            console.log("Move: ",move);
            this.playerSide.handlePlayerChoice(move);
        });
    }    


}