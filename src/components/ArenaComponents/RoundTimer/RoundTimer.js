import { Generator } from "../../../helpers/Generator.js";

const SECONDS_LEFT="Seconds left: ";

export class RoundTimer{
    constructor(container,duration=20){
        this.root=container;
        this.duration=duration;
        this.render();
    }

    render(){
        this.root.innerHTML=RoundTimer.markup(this.duration);
        this.counterEl=this.root.querySelector(".round-timer__counter");
    }

    static markup(duration){
        return `
            <span class="round-timer__counter">${SECONDS_LEFT} ${duration}</span>
        `;
    }


    start(){
        this.timeLeft=this.duration;

        this.interval=setInterval(()=>{

            this.timeLeft--;

            if(this.timeLeft<Math.floor(this.duration/2)){
                this.root.classList.add("alert");
            }
            if(this.timeLeft<0){
                
                this.root.dispatchEvent(new CustomEvent("timerFinished",{
                    detail: Generator.getRandomMove()
                }));
            
                return;
            }

            this.updateDisplay(this.timeLeft);



        },1000);
    }

    updateDisplay(timeLeft){
        this.counterEl.textContent=`${SECONDS_LEFT}`+timeLeft;
    }

    setMovePlayedMsg(){
        this.counterEl.textContent="Move played";
    }

    stop(){
        clearInterval(this.interval);
    }

    finish(){
        this.stop();
        this.setMovePlayedMsg();
    }

    reset(){
        this.updateDisplay(this.duration);
        this.root.classList.remove("alert");        
    }


}