$(document).ready(function (){
    if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined){
        LoadAuthorized()
    } else {
        LoadUnauthorized()
    }
})

function LoadAuthorized(){
    $(".navbar").removeClass("nav-bar-unauthorized")
    $(".navbar").addClass("nav-bar-authorized")
    $(".container").removeClass("content-unauthorized")
    $(".container").addClass("content-authorized")
    fetch('https://react-midterm.kreosoft.space/api/account/profile', {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem('token')
        })
    })
        .then(response => {
            return response.json()
        })
        .then((json) => {
            $('#navbar-nickname').text(`Авторизован как - ${json.nickName}`)
        })
        .catch(reason => console.log(reason))
}

function LoadUnauthorized(){
    $(".navbar").removeClass("nav-bar-authorized")
    $(".navbar").addClass("nav-bar-unauthorized")
    $(".container").removeClass("content-authorized")
    $(".container").addClass("content-unauthorized")
}