import { createRound } from "../../api/api.js";
import { matchResult } from "../../Enums/MatchResult.js";
import { Generator } from "../../helpers/Generator.js";
import { Move } from "../../Enums/MoveEnum.js";

const ROUND_NUMBER=5;

export class Game{
    constructor(gameId,roundIdList,currentRoundIndex=0){
        this.gameId=gameId;
        this.roundIdList=roundIdList ?? [];
        this.currentRoundIndex=currentRoundIndex;
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
        const game=new Game(gameId,roundIdList,0);
   

        game.save();
        return game;
    }

    save(){
        const gameState={
            gameId:this.gameId,
            roundIdList: this.roundIdList,
            currentRoundIndex: this.currentRoundIndex
        }    
        
        localStorage.setItem("lastGame",JSON.stringify(gameState));        
    }

    static load(){
        try{
            const gameState=JSON.parse(localStorage.getItem("lastGame"));
            if(!gameState) return null;

            return new Game(gameState.gameId,gameState.roundIdList,gameState.currentRoundIndex);
        }
        catch(error){
            console.error("Error: ",error);
            return null;
        }

    }

    isFinished(){
        return this.currentRoundIndex>=this.roundIdList.length
    }
}