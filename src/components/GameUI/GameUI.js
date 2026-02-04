import { Game } from "../Game/Game.js";
import { DisplaySwitch } from "../../helpers/DisplaySwitch.js";
import { Menu } from "../Menu/Menu.js";

export class GameUI {
    constructor() {
        this.game = Game.load();
        this.menu = new Menu(".menu");
        this.showInitialMenu();
        this.addEventListeners();
    }

    showInitialMenu() {
        if(this.game && !this.game.isFinished())
            DisplaySwitch.showElement(this.menu.continueBtn);

        DisplaySwitch.hideElement(this.menu.startBtn);
    }

    async handleCreateGame(){
        const isGameCreated=await Game.createNewGame();

        if(!isGameCreated){
            await this.showToast("Network error. Try again");
            return;
        }
        if(isGameCreated){
            await this.showToast("Game successfuly created","success");

            DisplaySwitch.hideElement(this.menu.continueBtn);
            DisplaySwitch.hideElement(this.menu.createBtn);
            DisplaySwitch.showElement(this.menu.startBtn);
        }
    }

    startGame() {
    }

    continueGame() {
    }

    addEventListeners(){
        this.menu.root.addEventListener("createGame",async ()=> await this.handleCreateGame());
        this.menu.root.addEventListener("startGame",()=>this.startGame());
        this.menu.root.addEventListener("continueGame",()=>this.continueGame());
    }


    async showToast(message,type="error",duration=2000){

    return new Promise(resolve=>{
        const toast=document.querySelector(".toast");

        toast.classList.toggle("success",type==="success");
        toast.classList.toggle("error",type==="error");

        toast.textContent=message;

        toast.classList.remove("hidden");

        setTimeout(()=>{
            toast.classList.add("hidden");
            resolve();
        },duration);        
    });

}    

}
