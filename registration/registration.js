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
            return response.json()
        })
        .then((json) => {
            localStorage.setItem('token', `${json['token']}`);
            console.log(localStorage.getItem('token'))
        })
}

function SerializeForm() {
    let userName = $('#input-login')
    let name = $('#input-name')
    let password = $('#input-password')
    let email = $('#input-email')
    let birthDate = $('#input-birth')
    let gender = $('#input-gender')
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