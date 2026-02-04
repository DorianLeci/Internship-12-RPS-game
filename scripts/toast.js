export function showToast(message,type="error",duration=2000){

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