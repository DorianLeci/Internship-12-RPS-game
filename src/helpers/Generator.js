export class Generator{
    static moveList=["rock","paper","scissors"];

    static generateGameId(){
        return crypto.randomUUID();
    }

    static getRandomMove(){
        return Generator.moveList[Math.floor(Math.random()*Generator.moveList.length)];
    }
}