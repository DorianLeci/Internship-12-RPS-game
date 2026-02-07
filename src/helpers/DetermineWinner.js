import { matchResult } from "../Enums/MatchResult.js";
import { Move } from "../Enums/MoveEnum.js";

export function DetermineWinner(playerMove,botMove){
    
    if(playerMove===botMove) return matchResult.DRAW;

    if ((playerMove===Move.ROCK && botMove===Move.SCISSORS) ||
        (playerMove===Move.PAPER && botMove===Move.ROCK) ||
        (playerMove===Move.SCISSORS && botMove===Move.PAPER)){

        return matchResult.PLAYER_WIN;
    }

    return matchResult.BOT_WIN;
}