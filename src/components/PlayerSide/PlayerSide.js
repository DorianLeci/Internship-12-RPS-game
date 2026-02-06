export class PlayerSide{
    constructor(container){
        this.root=container;
        this.render();
        this.dispatchEvents();
    }

    render() {
        this.root.innerHTML = PlayerSide.markup();
    }

    static markup() {
        return `
            <div class="arena-side__info">
                <img class="arena-side__image" src="/assets/user.svg" alt="user"/>    
                <span class="arena-side__title">You</span>                            
            </div>                
            <div class="arena-side__choices">  
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

        const choiceElements=this.root.querySelectorAll(".arena-side__choice");

        choiceElements.forEach(choiceEl=>{
            choiceEl.addEventListener("click",(e)=>
                {
                    this.root.dispatchEvent(new CustomEvent("playerChoice",{detail: e.currentTarget.dataset.move}))
                });
        })
    }
}