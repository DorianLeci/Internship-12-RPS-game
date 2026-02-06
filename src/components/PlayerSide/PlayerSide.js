export class PlayerSide{
    constructor(container){
        this.root=container;
        this.render();
    }

    render() {
        this.root.innerHTML = PlayerSide.markup();
    }

    static markup() {
        return `
            <div class="player-side__info">
                <img class="player-side__image" src="/assets/user.svg" alt="user"/>    
                <span class="player-side__title">You</span>                            
            </div>                
            <div class="player-side__choices">    
                <img class="player-side__choice" src="/assets/misc-pet-rock.svg" alt="Rock" data-move="rock"/>
                <img class="player-side__choice" src="/assets/crumpled-paper.svg" alt="Paper" data-move="paper"/>
                <img class="player-side__choice" src="/assets/scissors.svg" alt="Scissors" data-move="scissors"/>
            </div>
        `;
    }    
    
    dispatchEvents(){

        const choiceElements=this.root.querySelectorAll(".player-side__choice");

        choiceElements.foreach(choiceEl=>{
            choiceEl.addEventListener("click",(e)=>
                {
                    this.root.dispatchEvent(new CustomEvent("playerChoice",{detail: e.currentTarget.dataset.move}))

                });
        })
    }
}