import { Move } from "../Enums/MoveEnum.js";

export class Generator{
    static moveList=Object.values(Move).filter(move=>move!=Move.PENDING);

    static generateGameId(){
        return crypto.randomUUID();
    }

    static getRandomMove(){
        return Generator.moveList[Math.floor(Math.random()*Generator.moveList.length)];
    }
}