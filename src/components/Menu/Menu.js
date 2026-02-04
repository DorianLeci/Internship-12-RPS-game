export class Menu {
    constructor(container) {
        this.root = document.querySelector(container);

        this.render();
        this.cacheButtons();
        this.dispatchEvents();
    }

    render() {
        this.root.innerHTML = Menu.markup();
    }

    static markup() {
        return `
            <button class="create-game-button">Create Game</button>
            <button class="start-game-button hidden">Start Game</button>
            <button class="continue-game-button hidden">Continue Game</button>
        `;
    }    

    cacheButtons() {
        this.createBtn = this.root.querySelector(".create-game-button");
        this.startBtn = this.root.querySelector(".start-game-button");
        this.continueBtn = this.root.querySelector(".continue-game-button");
    }

    dispatchEvents() {

        this.createBtn.addEventListener("click", () => {
            this.root.dispatchEvent(new CustomEvent("createGame"));
        });

        this.startBtn.addEventListener("click", () => {
            this.root.dispatchEvent(new CustomEvent("startGame"));
        });

        this.continueBtn.addEventListener("click", () => {
            this.root.dispatchEvent(new CustomEvent("continueGame"));
        });
    }

}
