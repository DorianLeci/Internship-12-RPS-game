import { AudioPlayer } from "../../../Audio/AudioPlayer.js";

export class FinalResult{
    constructor(container,finalScore,finalResultText){
        this.root=container;
        this.render(finalScore,finalResultText);
    }

    render(score,resultText){
        this.root.innerHTML=FinalResult.markup(score,resultText);
        this.root.getBoundingClientRect();        
        this.root.classList.add("visible");        
    }

    static markup(score,resultText){
        return `
            <div class="final-result__content">        
                <h1 class="final-result__text">${resultText}</h1>
                <div class="score-container">
                    <p class="final-result__score">Player: ${score.player}</p>
                    <p class="final-result__score">Bot: ${score.bot}</p>
                    <p class="final-result__score">Draw: ${score.draw}</p>
                </div>
            </div>
        `;
    }

    playSound(finalResult){
        AudioPlayer.playSound(finalResult,true);
    }
}