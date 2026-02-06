
import { DisplaySwitch } from "../../helpers/DisplaySwitch.js";
import { Game } from "../Game/Game.js";
import { Menu } from "../../components/Menu/Menu.js";
import { Toast } from "../../components/Toast/Toast.js";
import { Header } from "../../components/Header/Header.js";
import { Arena } from "../../components/ArenaComponents/Arena/Arena.js";

export class GameUI {
    constructor() {
        this.game = Game.load();
        this.menu = new Menu(".menu");
        this.toast=new Toast(".toast-wrapper");
        this.header=new Header(".game-header");        
        this.showInitialMenu();
        this.addEventListeners();
    }

    showInitialMenu() {
        if(this.game && !this.game.isFinished())
            DisplaySwitch.showElement(this.menu.continueBtn);

        DisplaySwitch.hideElement(this.menu.startBtn);
    }

    async handleCreateGame(){
        const newGame=await Game.createNewGame();

        if(!newGame){
            await this.toast.showToast("Network error. Try again");
            return;
        }
        
        await this.toast.showToast("Game successfuly created","success");

        DisplaySwitch.hideElement(this.menu.continueBtn);
        DisplaySwitch.hideElement(this.menu.createBtn);
        DisplaySwitch.showElement(this.menu.startBtn);
            
        this.game=newGame;
    }

    startGame() {        
        setTimeout(()=>{
            this.arena=new Arena(this.game,document.querySelector(".arena"));     
                    
            DisplaySwitch.hideElement(this.menu.root);
            DisplaySwitch.hideElement(this.header.root);
            DisplaySwitch.showElement(this.arena.arenaElement);              
        },2000);
    
    }

    continueGame() {
    }

    addEventListeners(){
        this.menu.root.addEventListener("createGame",async ()=> await this.handleCreateGame());
        this.menu.root.addEventListener("startGame",()=>this.startGame());
        this.menu.root.addEventListener("continueGame",()=>this.continueGame());
    }

    

}
