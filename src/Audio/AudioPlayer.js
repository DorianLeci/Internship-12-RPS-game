import { matchResult } from "../Enums/MatchResult.js";

export class AudioPlayer{

    static soundMap={
        [matchResult.PLAYER_WIN]: new Audio("assets/audio/you-win.mp3"),
        [matchResult.BOT_WIN]: new Audio("assets/audio/you-lose-female-gfx-sounds-1-1-00-01.mp3"),
        [matchResult.DRAW]: new Audio("assets/audio/draw.mp3")
    }
    static playSound(type){
        AudioPlayer.soundMap[type]?.play().catch(err=>console.error(err));
    }
}