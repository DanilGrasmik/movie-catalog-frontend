$(document).ready(function (){
    console.log(localStorage.getItem('token'))
})

$("#button-submit").click(function (){
    PostData(SerializeForm())
})

function PostData(data){
    fetch('https://react-midterm.kreosoft.space/api/account/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((json) => {
            localStorage.setItem('token', `${json['token']}`);
            window.location.href = "../catalog"
           // console.log(localStorage.getItem('token'))
        })
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