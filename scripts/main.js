import { createGame } from "./gameLogic.js";

const createGameBtn=document.querySelector(".create-game-button");

createGameBtn.addEventListener("click",async ()=>{
    await createGame();
});