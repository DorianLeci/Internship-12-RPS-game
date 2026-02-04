export function showToast(message,type="error",duration=3000){
    const toast=document.querySelector(".toast");

    toast.classList.toggle("success",type==="success");
    toast.classList.toggle("error",type==="error");

    toast.textContent=message;

    toast.classList.add("visible");
    toast.classList.remove("hidden");

    setTimeout(()=>{
        toast.classList.remove("visible");
        toast.classList.add("hidden");
    },duration);
}