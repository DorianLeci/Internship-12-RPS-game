export class BotSide{
    constructor(container){
        this.root=container;
        this.render();
    }

    render() {
        this.root.innerHTML = BotSide.markup();
    }

    static markup() {
        return `
            <img class="bot-side__image"/>
            <div class="bot-side__choice">
        `;
    }        
}