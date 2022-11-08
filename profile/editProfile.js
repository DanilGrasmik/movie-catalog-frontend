const AVATAR_NONE_URL = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"

$("#button-edit").click(function (e){
    PutData(SerializeForm())
    e.preventDefault()
})


function PutData(data){
    if(CheckValidation()){
        fetch(`${URL}/api/account/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json()
            })
            .catch(error => console.error(error))
    }
}

function SerializeForm() {
    let id = $(".profile-info").attr("id").toString()
    let nickName = $('#profile-nickname').text()
    let name = $('#profile-name').val()
    let email = $('#profile-email').val()
    let birthDate = $('#profile-birth').val()
    let gender = $('#profile-sex').val()
    let avatarLink = $('#profile-avatar-link').val()
    let data = {
        "nickName": nickName,
        "name": name,
        "email": email,
        "id": id,
        "avatarLink": avatarLink
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
    let birthDate = new Date($('#profile-birth').val())
    let DateToday = new Date();
    if(DateToday < birthDate){
        $('#profile-birth').addClass('is-invalid')
        return false
    } else {
        $('#profile-birth').removeClass('is-invalid')
    }

    let email = $('#profile-email').val()
    let emailExp = /[a-zA-Z]+\w*@[a-zA-Z]+\.[a-zA-Z]+/
    if(emailExp.test(email)){
        $('#profile-email').removeClass('is-invalid')
    } else {
        $('#profile-email').addClass('is-invalid')
        return false
    }

    return true
}