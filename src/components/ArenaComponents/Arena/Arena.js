import { getRound, getAllRounds, updateRound } from "../../../api/api.js";
import { matchResult } from "../../../Enums/MatchResult.js";
import { DetermineWinner } from "../../../helpers/DetermineWinner.js";
import { ArenaRoundInfo } from "../ArenaRoundInfo/ArenaRoundInfo.js";
import { BotSide } from "../BotSide/BotSide.js";
import { PlayerSide } from "../PlayerSide/PlayerSide.js";
import { RoundTimer } from "../RoundTimer/RoundTimer.js";
import { AudioPlayer } from "../../../Audio/AudioPlayer.js";
import { ApiErrorHelper } from "../../../helpers/ApiErrorHelper.js";
import { FinalResult } from "../FinalResult/FinalResult.js";

export class Arena{
    constructor(game,toast,arenaElement,onReturnToMenu){
        this.game=game; 
        this.toast=toast;
        this.arenaElement=arenaElement;
        this.onReturnToMenu=onReturnToMenu;
        this.init();
    }

    init(){
        this.toast.root.classList.add("arena-toast-wrapper");

        this.playerSide=new PlayerSide(this.arenaElement.querySelector(".player-side"));

        this.botSide=new BotSide(this.arenaElement.querySelector(".bot-side"));

        this.roundTimer=new RoundTimer(this.arenaElement.querySelector(".round-timer"));
        this.roundTimer.start();

        this.arenaRoundInfo=new ArenaRoundInfo(this.arenaElement.querySelector(".arena__round-info"));
        this.arenaRoundInfo.updateCounter(this.game.currentRoundIndex);

        this.addEventListeners();
    }

    async playRound(playerMove){
        try{
            const roundId=this.game.roundIdList[this.game.currentRoundIndex];
            const currentRound=await getRound(roundId);

            if(!currentRound) return;        

            this.botSide.handleBotMoveChoice(currentRound.data.botMove);
            this.playerSide.lockPointerEvents();

            const matchOutcome=DetermineWinner(playerMove,currentRound.data.botMove);
            
            const updatedRound=await updateRound(currentRound.id,{
                data:{
                    playerMove,
                    botMove: currentRound.data.botMove,
                    result: matchOutcome
                }
            });

            setTimeout(async ()=>{
                const score=await this.updateScoreUI();                
                AudioPlayer.playSound(matchOutcome);
                await this.nextRound(score);
            },500);

        }
        catch(error){
            await ApiErrorHelper.handleApiError(error,async (msg)=>await this.toast.showToast(msg));   
            this.onReturnToMenu();
        }


    }

    addEventListeners(){
        this._onPlayerChoice=async (e)=>{
            this.roundTimer.finish();

            const move=e.detail;
            await this.playRound(move);
        }
        this.playerSide.root.addEventListener("playerChoice",this._onPlayerChoice);


        this._onTimerFinish=async (e)=>{
            this.roundTimer.finish();

            const move=e.detail;
            this.playerSide.handlePlayerMoveChoice(move);

            await this.playRound(move);

        }
        this.roundTimer.root.addEventListener("timerFinished",this._onTimerFinish);
    }    

    destroy(){
        this.playerSide.root.removeEventListener("playerChoice",this._onPlayerChoice);
        this.roundTimer.root.removeEventListener("timerFinished",this._onTimerFinish);
        this.roundTimer.stop();
        this.playerSide.reset(); 
        this.playerSide.destroy();
        this.botSide.reset();        
    }    

    async updateScoreUI(){
        try{
            const rounds=await getAllRounds(this.game.gameId,this.game.roundIdList);

            let score={
                player: 0,
                bot: 0,
                draw: 0
            }

            rounds.forEach(round=>{
                switch(round.data.result){
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
            this.arenaRoundInfo.updateScore(score,rounds[this.game.currentRoundIndex].data.result);
            return score;
        }
        catch(error){
            await ApiErrorHelper.handleApiError(error,async (msg)=>await this.toast.showToast(msg));   
            this.onReturnToMenu();
        }        
    }

    nextRound(score,delay=3000){
        return new Promise((resolve)=>{
            setTimeout(async ()=>{
                if(this.game.isFinished()){
                    this.destroy();
                    await this.showGameResult(score);
                }
                else{
                    this.game.currentRoundIndex++;
                    this.game.save();

                    this.roundTimer.reset();
                    this.playerSide.reset();
                    this.botSide.reset();
                    this.arenaRoundInfo.updateCounter(this.game.currentRoundIndex);
                    this.roundTimer.start();
                }

                resolve();
            },delay);
        });
    }
    
    async showGameResult(score){
        
        let winnerText="Draw!";
        let finalResult=matchResult.DRAW;

        if(score.player>score.bot){
            winnerText="You Win!";
            finalResult=matchResult.PLAYER_WIN;
        } 
        else if(score.bot>score.player){
            winnerText="You lose!";
            finalResult=matchResult.BOT_WIN;
        } 

        const overlay=document.createElement("div");
        overlay.classList.add("final-result__overlay");

        this.arenaElement.appendChild(overlay);

        this.finalResult=new FinalResult(overlay,score,winnerText);
        this.finalResult.playSound(finalResult);

        setTimeout(()=>{
            overlay.classList.remove("visible");
            overlay.addEventListener("transitionend",()=>{
                overlay.remove();
                this.onReturnToMenu();
            });
        },5000);
    }



}