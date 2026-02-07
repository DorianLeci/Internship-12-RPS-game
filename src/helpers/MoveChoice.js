export class MoveChoice{
    static handleMoveChoice(move,container,selector){
        const choiceElements=container.querySelectorAll(selector);

        choiceElements.forEach(element => {
            if(element.dataset.move!==move)
                element.classList.add("fadeout");
            
            else element.classList.add("selected");
        });

    }
}