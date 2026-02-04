import { createRound } from "./api.js";
import { generateGameId,getRandomMove } from "./helpers.js";

const ROUND_NUMBER=5;

export async function createGame(){
    const gameId=generateGameId();
    const roundIdList=[];

    for(let i=1;i<=ROUND_NUMBER;i++){

        const payload={
            name: "rps-round",
            data:{
                gameId,
                round: i,
                playerMove:"pending",
                botMove: getRandomMove(),
                result: "pending"
            }
        }
        const createdRound=await createRound(payload);

        if(createdRound===null) return false;

        roundIdList.push(createdRound.id);

        const gameState={
            gameId,
            roundIdList,
            currentRoundIndex: 0
        }

        localStorage.setItem("lastGame",JSON.stringify(gameState));
        return true;
    }
}