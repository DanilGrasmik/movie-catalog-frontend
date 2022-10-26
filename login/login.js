$("#button-log-in").click(function (){
    PostData(SerializeForm())
})

function PostData(data){
    fetch('https://react-midterm.kreosoft.space/api/account/login', {
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
    let password = $('#input-password').val()
    let data = {
        "userName": userName,
        "password": password,
    }
    return data
}