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
            <div class="arena-side__info">
                <img class="arena-side__image" src="/assets/robot-bot-icon.svg"/>     
                <span class="arena-side__title">Computer</span>       
            </div>
            <div class="arena-side__choices hidden transparent-bg"></div>
        `;   
    }        
}