$("#button-submit").click(function (e){
    PostData(SerializeForm())
     e.preventDefault()
})

function PostData(data){
    if(CheckValidation()) {
        fetch('https://react-midterm.kreosoft.space/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                localStorage.setItem('token', `${json['token']}`);
                window.location.href = "../catalog"
                // console.log(localStorage.getItem('token'))
            })
    }
}

function SerializeForm() {
    let userName = $('#input-login').val()
    let name = $('#input-name').val()
    let password = $('#input-password').val()
    let email = $('#input-email').val()
    let birthDate = $('#input-birth').val()
    let gender = $('#input-sex').val()
    let data = {
        "userName": userName,
        "password": password,
        "name": name,
        "email": email
    }
    if(birthDate !== ""){
        data.birthDate = birthDate + "T00:00:00.000Z"
    }
    if(gender !== ""){
        data.gender = parseInt(gender)
    }
    return data
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
    let confirmPassword = $("#input-confirm-password").val()
    if(password !== confirmPassword){
        $("#input-confirm-password").addClass("is-invalid")
        return false
    } else {
        $("#input-confirm-password").removeClass("is-invalid")
    }

    let email = $('#input-email').val()
    let emailExp = /[a-zA-Z]+\w*@[a-zA-Z]+\.[a-zA-Z]+/
    if(emailExp.test(email)){
        $('#input-email').removeClass('is-invalid')
    } else {
        $('#input-email').addClass('is-invalid')
        return false
    }

    return true
}