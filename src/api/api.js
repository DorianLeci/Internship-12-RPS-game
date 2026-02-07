import { ApiError } from "../error/ApiError.js";

const MOCK_ROUND_STORE = new Map();
export async function createRound(payload){
    // let response;
    // try{
    //     response=await fetch("https://api.restful-api.dev/objects",{
    //         method: "POST",
    //         headers: {
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify(payload)
    //     }
    //     );

    // }
    // catch{
    //     throw ApiError.networkError();
    // }


    // if(!response.ok)
    //     throw ApiError.createRoundError(response.status);

    // return await response.json();

        const id = Math.random().toString(36).substr(2, 9);
        const round = {
            id,
            data:{
                name: "rps-round",
                gameId: payload.data.gameId,
                playerMove: payload.data.playerMove,
                botMove: payload.data.botMove,
                result: payload.data.result,
                createdAt: new Date().toISOString()
            }

        };

        MOCK_ROUND_STORE.set(id, round);
        return round;
}

export async function getRound(roundId){
    // let response;
    // try{
    //     response=await fetch(`https://api.restful-api.dev/objects/${roundId}`);
    // }
    // catch{
    //     throw ApiError.networkError();
    // }


    // if(!response.ok)
    //     throw ApiError.getRoundError(response.status,roundId);

    // return await response.json();
        
        return MOCK_ROUND_STORE.get(roundId);
}


export async function getAllRounds(gameId,roundList){
        // const query=roundList.map(roundId=>`id=${roundId}`).join('&');

        // let response;
        // try{
        //     response=await fetch(`https://ap.restful-api.dev/objects?${query}`);
        // }
        // catch{
        //     throw ApiError.networkError();
        // }

        // if(!response.ok)
        //     throw ApiError.getAllRoundsError(response.status);

        // const rounds=await response.json();

        // return rounds.filter(round=>round.data.gameId===gameId);

        const rounds = Array.from(MOCK_ROUND_STORE.values())
            .filter(round => roundList.includes(round.id) && round.data.gameId === gameId);

        return rounds;        

}


export async function updateRound(roundId,payload){
    // let response;

    // try{
    //     response=await fetch(`https://api.restful-api.dev/objects/${roundId}`,{
    //         method: "PATCH",
    //         headers: {"Content-Type":"application/json"},
    //         body: JSON.stringify(payload)
    //     });
    // }    
    // catch{
    //     throw ApiError.networkError();
    // }

    // if(!response.ok)
    //     throw ApiError.updateRoundError(response.status,roundId);

    // return await response.json();

    const round = MOCK_ROUND_STORE.get(roundId);
    if (!round) throw ApiError.updateRoundError(404, roundId);

    const updated = { ...round, data: { ...round.data, ...payload.data } };
    MOCK_ROUND_STORE.set(roundId, updated);
    return updated;
}