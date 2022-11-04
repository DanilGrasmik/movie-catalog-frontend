$(document).ready(function (){
    if(localStorage.getItem('loginCheck') !== 'true'){
        $('#validation-fail-text').addClass('d-none')
    } else {
        $('#validation-fail-text').removeClass('d-none')
    }
})

$('#button-log-registration').click(function (e){
    window.location.href = '../registration'
    e.preventDefault()
})

$("#button-log-in").click(function (e){
    PostData(SerializeForm())
    e.preventDefault()
})

function PostData(data){
    if(CheckValidation()) {
        fetch(`${URL}/api/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
               if(!response.ok){
                   $('#validation-fail-text').removeClass('d-none')
               } else {
                   return response.json()
               }
            })
            .then((json) => {
                localStorage.setItem('token', `${json['token']}`);
                $('#validation-fail-text').addClass('d-none')
                window.location.href = "../catalog"
            })
    }
}

function SerializeForm() {
    let userName = $('#input-login').val()
    let password = $('#input-password').val()
    return {
        "userName": userName,
        "password": password,
    }
}

function CheckValidation(){
    let login = $('#input-login').val()
    let loginExp = /[a-zA-z]+\w*/
    if(loginExp.test(login) && login.length >= 5 && login.length <= 16){
        $('#input-login').removeClass('is-invalid')
    } else {
        $('#input-login').addClass('is-invalid')
        return false
    }

    let password = $("#input-password").val()
    if(password.length < 8){
        $("#input-password").addClass("is-invalid")
        return false
    } else {
        $("#input-password").removeClass("is-invalid")
    }
    return true
}