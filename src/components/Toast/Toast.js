
import { DisplaySwitch } from "../../helpers/DisplaySwitch.js";

export class Toast{
    constructor(container) {
        this.root = document.querySelector(container);
        this.render();
    }    

    render(){
        this.root.innerHTML=Toast.markup();
        this.toastEl=this.root.querySelector(".toast");
    }

    static markup(){
        return `<div class="toast hidden"></div>`;
    }

    async showToast(message,type="error",duration=2000){

        return new Promise(resolve=>{

            this.toastEl.classList.toggle("success",type==="success");
            this.toastEl.classList.toggle("error",type==="error");

            this.toastEl.textContent=message;

            DisplaySwitch.showElement(this.toastEl);

            setTimeout(()=>{
                DisplaySwitch.hideElement(this.toastEl);
                resolve();
            },duration);        
        });
    }    

}