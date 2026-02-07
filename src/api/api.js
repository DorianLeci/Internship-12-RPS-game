const MOCK_ROUND_STORE = new Map();
export async function createRound(payload){
    try{
        // const response=await fetch("https://api.restful-api.dev/objects",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify(payload)
        // }
        // );

        // if(!response.ok){
        //     throw new Error(`HTTP error ${response.status} (${response.statusText}) while creating game round`);
        // }

        // const data=await response.json();
        // console.log(data);
        // return data;

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

    catch(error){
        console.error(error);
        return null;
    }

}

export async function fetchRound(roundId){
    try{
        // const response=await fetch(`https://api.restful-api.dev/objects/${roundId}`,{
        //     method: "GET"
        // }
        // );

        // if(!response.ok){
        //     throw new Error(`HTTP error ${response.status} (${response.statusText}) while fetching roundId: ${roundId}`);
        // }

        // const data=await response.json();
        // return data;
        
        return MOCK_ROUND_STORE.get(roundId);
    }

    catch(error){
        console.error(error);
        return null;
    }
}

export async function getAllRounds(gameId,roundList){
    try{
        // const query=roundList.map(roundId=>`id=${roundList}`).join('&');

        // const response=await fetch(`https://api.restful-api.dev/objects?${query}`);

        // if(!response.ok)
        //     throw new Error(`HTTP error ${response.status} (${response.statusText}) while fetching all rounds`);

        // const rounds=await response.json();

        // return rounds.filter(round=>round.data.gameId===gameId);

        const rounds = Array.from(MOCK_ROUND_STORE.values())
            .filter(round => roundList.includes(round.id) && round.data.gameId === gameId);

        return rounds;        
    }

    catch(error){
        console.error(error);
        return [];
    }    

    

}