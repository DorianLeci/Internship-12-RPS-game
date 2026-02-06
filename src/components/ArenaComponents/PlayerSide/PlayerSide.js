export class PlayerSide{
    constructor(container){
        this.root=container;
        this.render();
        this.dispatchEvents();
    }

    render() {
        this.root.innerHTML = PlayerSide.markup();
        this.choiceContainer=this.root.querySelector(".arena-side__choices");
    }

    static markup() {
        return `
            <div class="arena-side__info">
                <img class="arena-side__image" src="/assets/user.svg" alt="user"/>    
                <span class="arena-side__title">You</span>                            
            </div>                
            <div class="arena-side__choices transparent-bg">  
                <div class="arena-side__choice" data-move="rock">
                    <img src="/assets/misc-pet-rock.svg" alt="rock" />
                    <div class="marker"></div> 
                </div>
                <div class="arena-side__choice" data-move="paper">
                    <img src="/assets/crumpled-paper.svg" alt="paper" />
                    <div class="marker"></div>
                </div>
                <div class="arena-side__choice" data-move="scissors">
                    <img src="/assets/scissors.svg" alt="scissors" />
                    <div class="marker"></div>
                </div>
            </div>
        `;
    }    
    
    dispatchEvents(){
        this.choiceContainer.addEventListener("click",(e)=>
            {
                const chosenEl=e.target.closest(".arena-side__choice");
                if(!chosenEl) return;
                this.handlePlayerChoice(chosenEl.dataset.move);
                this.root.dispatchEvent(new CustomEvent("playerChoice",{detail: chosenEl.dataset.move}));                
            });
    }

    handlePlayerChoice(move){
        const choiceElements=this.choiceContainer.querySelectorAll(".arena-side__choice");

        choiceElements.forEach(element => {
            if(element.dataset.move!==move)
                element.classList.add("fadeout");
            
            else element.classList.add("selected");
        });

    }



}