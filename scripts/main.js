import { createGame } from "./gameLogic.js";
import { showToast } from "./toast.js";

const createGameBtn=document.querySelector(".create-game-button");
const startGameBtn=document.querySelector(".start-game-button");
const continueGameBtn=document.querySelector(".continue-game-button");

createGameBtn.addEventListener("click",async ()=>{
    const isGameCreated=await createGame();

    if(!isGameCreated){
        await showToast("Network error. Try again");
        return;
    }
    if(isGameCreated){
        await showToast("Game successfuly created","success");

        startGameBtn.classList.remove("hidden");
        createGameBtn.classList.add("hidden");
        continueGameBtn.classList.add("hidden");
    }
});