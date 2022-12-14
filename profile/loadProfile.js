$(document).ready(function (){
    AuthorizationCheck()
    LoadProfileInfo()
})

function LoadProfileInfo(){
    fetch(`${URL}/api/account/profile`, {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem('token')
        })
    })
        .then(response => {
            return response.json()
        })
        .then((json) => {
            $(".profile-info").attr("id", json.id);
            $('#profile-nickname').text(json.nickName)
            $('#profile-avatar-link').val(json.avatarLink)
            $('#profile-birth').val(getFormattedDate(json.birthDate))
            $('#profile-email').val(json.email)
            $('#profile-name').val(json.name)
            $('#profile-sex').val(json.gender)
            LoadAvatarImage()
        })
        .catch(reason => console.log(reason))
}

function getFormattedDate(datetime) {
    var date = new Date(datetime);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function LoadAvatarImage(){
    let avatarUrl = $("#profile-avatar-link").val()
    avatarUrl !== "" ? $("#profile-avatar").attr("src", avatarUrl) : $("#profile-avatar").attr("src", AVATAR_NONE_URL)
}

function AuthorizationCheck(){
    if(localStorage.getItem('token') === null){
        window.location.href = "../noAuthorization"
    }
}