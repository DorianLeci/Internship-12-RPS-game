import { MoveChoice } from "../../../helpers/MoveChoice.js";
import { Move } from "../../../Enums/MoveEnum.js";

export class PlayerSide{
    static choiceContainerSelector=".arena-side__choices";
    static choiceElSelector=".arena-side__choice";

    constructor(container){
        this.root=container;
        this.render();
        this.dispatchEvents();
    }

    render() {
        this.root.innerHTML = PlayerSide.markup();
        this.choiceContainer=this.root.querySelector(PlayerSide.choiceContainerSelector);
    }

    static markup() {
        return `
            <div class="arena-side__info">
                <img class="arena-side__image" src="/assets/user.svg" alt="user"/>    
                <span class="arena-side__title">You</span>                            
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
    
    dispatchEvents(){
        this._onChoiceClick=(e)=>{
                const chosenEl=e.target.closest(".arena-side__choice");
                if(!chosenEl) return;
                this.handlePlayerMoveChoice(chosenEl.dataset.move);
                this.root.dispatchEvent(new CustomEvent("playerChoice",{detail: chosenEl.dataset.move}));                
        }
        this.choiceContainer.addEventListener("click",this._onChoiceClick);
    }

    destroy(){
        this.choiceContainer.removeEventListener("click", this._onChoiceClick);        
    }

    handlePlayerMoveChoice(move){
        MoveChoice.handleMoveChoice(move,this.choiceContainer,PlayerSide.choiceElSelector);
    }

    lockPointerEvents(){
        this.root.classList.add("locked");
    }

    reset(){
        this.root.classList.remove("locked");
        MoveChoice.resetMoveChoices(this.choiceContainer,PlayerSide.choiceElSelector);
    }

}