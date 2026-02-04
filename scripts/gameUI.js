import { Game } from "./gameLogic.js";

export class GameUI{
    constructor(){
        this.createBtn=document.querySelector(".create-game-button");
        this.startBtn=document.querySelector(".start-game-button");
        this.continueBtn=document.querySelector(".continue-game-button");
        this.init();
    }

    init(){
        this.game=Game.load();
        this.showInitialMenu();
        this.bindEvents();
    }

    showInitialMenu(){

        console.log("Is game finished: ",this.game?.isFinished());
        if(!this.game?.isFinished())
            this.continueBtn.classList.remove("hidden");

        this.createBtn.classList.remove("hidden");
    }

    bindEvents(){
        this.createBtn.addEventListener("click",async ()=>this.handleCreateGame());
        this.startBtn.addEventListener("click",async ()=>this.startGame());
    }

    async handleCreateGame(){
        const isGameCreated=await Game.createNewGame();

        if(!isGameCreated){
            await this.showToast("Network error. Try again");
            return;
        }
        if(isGameCreated){
            await this.showToast("Game successfuly created","success");
            this.startBtn.classList.remove("hidden");
            this.createBtn.classList.add("hidden");
            this.continueBtn.classList.add("hidden");
        }
    }

    startGame(){

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


