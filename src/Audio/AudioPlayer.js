import { matchResult } from "../Enums/MatchResult.js";

export class AudioPlayer{

    static soundMap={
        round:{
            [matchResult.PLAYER_WIN]: new Audio("assets/audio/you-win.mp3"),
            [matchResult.BOT_WIN]: new Audio("assets/audio/you-lose-female-gfx-sounds-1-1-00-01.mp3"),
            [matchResult.DRAW]: new Audio("assets/audio/draw.mp3")
        },

        final:{
            [matchResult.PLAYER_WIN]: new Audio("assets/audio/winner.mp3"),
            [matchResult.BOT_WIN]: new Audio("assets/audio/losing-horn.mp3"),
            [matchResult.DRAW]: new Audio("assets/audio/draw.mp3")
        }

    }
    static playSound(type,isFinal=false){
        const sound=isFinal ? AudioPlayer.soundMap["final"]?.[type] : AudioPlayer.soundMap["round"]?.[type];
        if(!sound) return;

        sound.play().catch(err=>console.error(err));
    }

}