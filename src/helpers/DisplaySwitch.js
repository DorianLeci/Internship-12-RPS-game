export class DisplaySwitch{

    static hideElement(element){
        element?.classList.add("hidden");
    }

    static showElement(element){
        element?.classList.remove("hidden");
    }
}