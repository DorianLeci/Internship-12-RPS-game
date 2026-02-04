export async function createRound(data){
    try{
        const response=await fetch("https://api.restful-api.dev/objects",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        );

        if(!response.ok){
            throw new Error("HTTP error!");
        }

        const data=await response.json();
        console.log(data);
        return data;
    }
    
    catch(error){
        console.error(error);
    }


}