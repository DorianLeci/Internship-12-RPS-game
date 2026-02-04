export class Header{
    constructor(container) {
        this.root = document.querySelector(container);
        this.render();
    }

    render() {
        this.root.innerHTML = Header.markup();
    }

    static markup() {
        return `
            <h1 class="game-title">Rock Paper Scissors</h1>
            <div class="game-icon-container">
                <img class="game-icon" src="/assets/misc-pet-rock.svg" alt="rock"/>
                <img class="game-icon" src="/assets/crumpled-paper.svg" alt="crumpled paper"/>    
                <img class="game-icon" src="/assets/scissors.svg" alt="scissors"/>                
            </div>
        `;
    }      
}