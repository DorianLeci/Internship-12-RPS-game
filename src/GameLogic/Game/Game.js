import { createRound } from "../../api/api.js";
import { matchResult } from "../../Enums/MatchResult.js";
import { Generator } from "../../helpers/Generator.js";
import { Move } from "../../Enums/MoveEnum.js";

const ROUND_NUMBER=5;

export class Game{
    constructor(gameId,roundIdList,currentRoundIndex=0,score){
        this.gameId=gameId;
        this.roundIdList=roundIdList ?? [];
        this.currentRoundIndex=currentRoundIndex;
        this.score=score;
    }

    static async createNewGame(){

        const gameId=Generator.generateGameId();
        const roundIdList=[];

        for(let i=1;i<=ROUND_NUMBER;i++){

            const payload={
                name: "rps-round",
                data:{
                    gameId,
                    playerMove: Move.PENDING,
                    botMove: Generator.getRandomMove(),
                    result: matchResult.PENDING
                }
            }

            const createdRound=await createRound(payload);

            if(createdRound===null) return null;

            roundIdList.push(createdRound.id);
        }
        const game=new Game(gameId,roundIdList,0,{player: 0, bot:0, draw: 0});
   

        game.save();
        return game;
    }

    save(){
        const gameState={
            gameId:this.gameId,
            roundIdList: this.roundIdList,
            currentRoundIndex: this.currentRoundIndex,
            score: this.score
        }    
        
        localStorage.setItem("lastGame",JSON.stringify(gameState));        
    }

    static load(){
        try{
            const gameState=JSON.parse(localStorage.getItem("lastGame"));
            if(!gameState) return null;

            console.log("Game stat score: ",gameState.score);

            return new Game(gameState.gameId,gameState.roundIdList,gameState.currentRoundIndex,gameState.score);
        }
        catch(error){
            console.error("Error: ",error);
            return null;
        }

    }

    isFinished(){
        return this.currentRoundIndex===this.roundIdList.length;
    }

    toNextRound(){
        this.currentRoundIndex++;
    }

    updateScore(winner){
        switch(winner){
            case matchResult.PLAYER_WIN:
                this.score.player++;
                break;
            
            case matchResult.BOT_WIN:
                this.score.bot++;
                break;

            case matchResult.DRAW:
                this.score.draw++;
                break;
        }
    }    
}