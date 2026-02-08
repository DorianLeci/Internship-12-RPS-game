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
        this.currentScore={player: 0,bot: 0,draw:0};
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
                    gameId: this.game.gameId,
                    playerMove,
                    botMove: currentRound.data.botMove,
                    result: matchOutcome
                }
            });

            setTimeout(async ()=>{
                await this.updateScoreUI(matchOutcome);                
                AudioPlayer.playSound(matchOutcome);
                await this.nextRound();
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

    async updateScoreUI(matchOutcome){
        switch (matchOutcome) {
            case matchResult.PLAYER_WIN: this.currentScore.player++; break;
            case matchResult.BOT_WIN: this.currentScore.bot++; break;
            case matchResult.DRAW: this.currentScore.draw++; break;
        }
        this.arenaRoundInfo.updateScore(this.currentScore,matchOutcome);
            
    }

    nextRound(delay=3000){
        return new Promise((resolve)=>{
            setTimeout(async ()=>{
                if(this.game.isFinished()){
                    this.destroy();
                    await this.showGameResult();
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
    
    async showGameResult(){
        
        let winnerText="Draw!";
        let finalResult=matchResult.DRAW;

        if(this.currentScore.player>this.currentScore.bot){
            winnerText="You Win!";
            finalResult=matchResult.PLAYER_WIN;
        } 
        else if(this.currentScore.bot>this.currentScore.player){
            winnerText="You lose!";
            finalResult=matchResult.BOT_WIN;
        } 

        const overlay=document.createElement("div");
        overlay.classList.add("final-result__overlay");

        this.arenaElement.appendChild(overlay);

        this.finalResult=new FinalResult(overlay,this.currentScore,winnerText);
        this.finalResult.playSound(finalResult);

        this.finalResult.setupGameReview(this.game.gameId,this.game.roundIdList,this.toast);

        // setTimeout(()=>{
        //     overlay.classList.remove("visible");
        //     overlay.addEventListener("transitionend",()=>{
        //         overlay.remove();
        //         this.onReturnToMenu();
        //     });
        // },5000);
    }



}