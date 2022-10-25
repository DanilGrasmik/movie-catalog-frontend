$(document).ready(function (){
    LoadProfileInfo()
})

function LoadProfileInfo(){
    fetch('https://react-midterm.kreosoft.space/api/account/profile', {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem('token')
        })
    })
        .then(response => {
            return response.json()
        })
        .then((json) => {
            $('#profile-nickname').text(json.nickName)
            $('#profile-birth').val(getFormattedDate(json.birthDate))
            $('#profile-email').val(json.email)
            $('#profile-name').val(json.name)
            $('#profile-sex').val(json.gender)
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