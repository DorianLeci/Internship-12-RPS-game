const moveList=["rock","paper","scissors"];

export function generateGameId(){
    return crypto.randomUUID();
}

export function getRandomMove(){
    return moveList[Math.floor(Math.random()*moveList.length)];
}