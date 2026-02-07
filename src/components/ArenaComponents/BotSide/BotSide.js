import { MoveChoice } from "../../../helpers/MoveChoice.js";
import { Move } from "../../../Enums/MoveEnum.js";

export class BotSide{
    static choiceElSelector=".arena-side__choice";

    constructor(container){
        this.root=container;
        this.render();
    }

    render() {
        this.root.innerHTML = BotSide.markup();
        this.choiceContainer=this.root.querySelector(".arena-side__choices");
    }

    static markup() {
        return `
            <div class="arena-side__info bot-side">
                <img class="arena-side__image" src="/assets/robot-bot-icon.svg"/>     
                <span class="arena-side__title">Computer</span>       
            </div>
            <div class="arena-side__choices transparent-bg">  
                <div class="arena-side__choice" data-move="${Move.ROCK}">
                    <img src="/assets/misc-pet-rock.svg" alt="rock" />
                    <div class="marker"></div> 
                </div>
                <div class="arena-side__choice" data-move="${Move.PAPER}">
                    <img src="/assets/crumpled-paper.svg" alt="paper" />
                    <div class="marker"></div>
                </div>
                <div class="arena-side__choice" data-move="${Move.SCISSORS}">
                    <img src="/assets/scissors.svg" alt="scissors" />
                    <div class="marker"></div>
                </div>
            </div>
        `;   
    }       
    
    handleBotMoveChoice(generatedMove){
        MoveChoice.handleMoveChoice(generatedMove,this.choiceContainer,BotSide.choiceElSelector);
    }    
}