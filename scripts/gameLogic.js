import { createRound } from "./api.js";
import { generateGameId,getRandomMove } from "./helpers.js";

const ROUND_NUMBER=5;

export class Game{
    constructor(gameId,currentRoundIndex=0,roundIdList){
        this.gameId=gameId;
        this.roundIdList=roundIdList ?? [];
        this.currentRoundIndex=currentRoundIndex;
    }

    static async createNewGame(){
        const roundIdList=[];

        for(let i=1;i<=ROUND_NUMBER;i++){

            const payload={
                name: "rps-round",
                data:{
                    gameId:this.gameId,
                    round: i,
                    playerMove:"pending",
                    botMove: getRandomMove(),
                    result: "pending"
                }
            }
            const createdRound=await createRound(payload);

            if(createdRound===null) return false;

            roundIdList.push(createdRound.id);
        }

        const game=new Game(generateGameId(),roundIdList,0);

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
