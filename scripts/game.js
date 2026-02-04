import { createRound } from "./api.js";
import { generateGameId } from "./helpers.js";

ROUND_NUMBER=5;

async function createGame(){
    gameId=generateGameId();
    roundIdList=[];

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
        roundIdList.push(createRound.id);
    }
}