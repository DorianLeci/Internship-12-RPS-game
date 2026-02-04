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
        //     throw new Error("HTTP error!");
        // }

        // const data=await response.json();
        // console.log(data);
        // return data;

        const id = Math.random().toString(36).substr(2, 9);

        // runda
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