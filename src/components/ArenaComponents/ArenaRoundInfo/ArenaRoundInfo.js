export class ArenaRoundInfo{
    constructor(container){
        this.root=container;
        this.render();
    }

    render() {
        this.root.innerHTML = ArenaRoundInfo.markup();
        this.counterEl=this.root.querySelector(".round-info__counter");
    }

    updateCounter(currentRoundIndex){
        this.counterEl.textContent=currentRoundIndex;
    }

    static markup() {
        return `
               <h2 class="round-info__title">Round</h2>
               <h2 class="round-info__counter"></h2>
        `;
    }        
}