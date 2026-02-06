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
            createdAt: new Date().toISOString(),
            name: payload.name,
            data: payload.data
        };        

        return round;
    }

    catch(error){
        console.error(error);
        return null;
    }

}

export async function fetchRound(roundId){
    try{
        const response=await fetch(`https://api.restful-api.dev/objects/${roundId}`,{
            method: "GET"
        }
        );

        if(!response.ok){
            throw new Error(`HTTP error ${response.status} (${response.statusText}) while fetching roundId: ${roundId}`);
        }

        const data=await response.json();
        return data;
    }

    catch(error){
        console.error(error);
        return null;
    }
}