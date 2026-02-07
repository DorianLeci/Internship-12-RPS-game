import { getRound, getAllRounds, updateRound } from "../../../api/api.js";
import { matchResult } from "../../../Enums/MatchResult.js";
import { DetermineWinner } from "../../../helpers/DetermineWinner.js";
import { ArenaRoundInfo } from "../ArenaRoundInfo/ArenaRoundInfo.js";
import { BotSide } from "../BotSide/BotSide.js";
import { PlayerSide } from "../PlayerSide/PlayerSide.js";
import { RoundTimer } from "../RoundTimer/RoundTimer.js";
import { AudioPlayer } from "../../../Audio/AudioPlayer.js";
import { ApiErrorHelper } from "../../../helpers/ApiErrorHelper.js";
import { Toast } from "../../Toast/Toast.js";
import { DisplaySwitch } from "../../../helpers/DisplaySwitch.js";

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

    async playRound(playerMove){
            const roundId=this.game.roundIdList[this.game.currentRoundIndex];
            const currentRound=await getRound(roundId);

            if(!currentRound) return;        

            this.botSide.handleBotMoveChoice(currentRound.data.botMove);
            this.playerSide.lockPointerEvents();

            const matchOutcome=DetermineWinner(playerMove,currentRound.data.botMove);

            setTimeout(()=>AudioPlayer.playSound(matchOutcome),500);
            
            const updatedRound=await updateRound(currentRound.id,{
                data:{
                    playerMove,
                    botMove: currentRound.data.botMove,
                    result: matchOutcome
                }

            });

    }

    addEventListeners(){
        this.playerSide.root.addEventListener("playerChoice",async (e)=>{
            this.roundTimer.finish();

            const move=e.detail;
            await this.playRound(move);
        });
        this.roundTimer.root.addEventListener("timerFinished",async (e)=>{
            this.roundTimer.finish();

            const move=e.detail;
            this.playerSide.handlePlayerMoveChoice(move);

            await this.playRound(move);

        });
    }    

    async updateScoreUI(){

        const rounds=await getAllRounds(this.game.gameId,this.game.roundIdList);

        let score={
            player: 0,
            bot: 0,
            draw: 0
        }

        rounds.forEach(round=>{
            switch(round.result){
                case matchResult.PLAYER_WIN:
                    score.player++;
                    break;
                
                case matchResult.BOT_WIN:
                    score.bot++;
                    break;
                
                case matchResult.DRAW:
                    score.draw++;
                    break;
                default:
                    break;
            }
        });

        this.arenaRoundInfo.updateScore(score);
    }

}