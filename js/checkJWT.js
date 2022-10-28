window.addEventListener("storage", function (){
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined){
        window.location.href = "../login"
    }
})