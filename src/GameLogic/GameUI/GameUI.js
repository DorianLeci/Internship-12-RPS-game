
import { DisplaySwitch } from "../../helpers/DisplaySwitch.js";
import { Game } from "../Game/Game.js";
import { Menu } from "../../components/Menu/Menu.js";
import { Toast } from "../../components/Toast/Toast.js";
import { Header } from "../../components/Header/Header.js";
import { Arena } from "../../components/ArenaComponents/Arena/Arena.js";
import { ApiError } from "../../error/ApiError.js";
import { ApiErrorHelper } from "../../helpers/ApiErrorHelper.js";

export class GameUI {
    constructor() {
        this.game = Game.load();
        this.menu = new Menu(".menu");
        this.toast=new Toast(".toast-wrapper");
        this.header=new Header(".game-header");  
        this.arena=null;      
        this.showInitialMenu();
        this.addEventListeners();
    }

    showInitialMenu() {
        if(this.game && !this.game.isFinished())
            DisplaySwitch.showElement(this.menu.continueBtn);

        DisplaySwitch.hideElement(this.menu.startBtn);
    }

    async handleCreateGame(){
        try{
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
        catch(error){
            ApiErrorHelper.handleApiError(error,async (msg)=>await this.toast.showToast(msg));
        }

    }

    async startGame() {     
        try{
            await this.toast.showToast("Game successfuly started","success");  

            this.arena=new Arena(this.game,this.toast,document.querySelector(".arena"),()=>this.returnToMainMenu());  
                                    
            DisplaySwitch.hideElement(this.menu.root);
            DisplaySwitch.hideElement(this.menu.startBtn);
            DisplaySwitch.hideElement(this.header.root);
            DisplaySwitch.showElement(this.arena.arenaElement);   
        }
        catch(error){

            this.returnToMainMenu();  
        }
           
    
    }

    continueGame() {
    }

    addEventListeners(){
        this.menu.root.addEventListener("createGame",async ()=> await this.handleCreateGame());
        this.menu.root.addEventListener("startGame",async ()=>await this.startGame());
        this.menu.root.addEventListener("continueGame",()=>this.continueGame());
    }

    returnToMainMenu(){
        DisplaySwitch.hideElement(this.arena.arenaElement);
        DisplaySwitch.showElement(this.header.root);        
        DisplaySwitch.showElement(this.menu.root);
        DisplaySwitch.showElement(this.menu.createBtn);
        DisplaySwitch.showElement(this.menu.continueBtn);        
        this.toast.root.classList.remove("arena-toast-wrapper");        
    }

    

}
