export class MoveChoice{
    static handleMoveChoice(move,container,selector){
        const choiceElements=container.querySelectorAll(selector);

        choiceElements.forEach(element => {
            if(element.dataset.move!==move)
                element.classList.add("fadeout");
            
            else element.classList.add("selected");
        });
    }

    static resetMoveChoices(container,selector){
        const choiceElements=container.querySelectorAll(selector);

        choiceElements.forEach(element => {
            element.classList.remove("fadeout");
            element.classList.remove("selected");
        });        
    }
}