const AVATAR_NONE_URL = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"

$(document).ready(function (){
    $("#button-edit").click(function (){SetAvatarImage()})
})

function SetAvatarImage(){
    let avatarUrl = $("#user-avatar-link").val()
    avatarUrl !== "" ? $("#user-avatar").attr("src", avatarUrl) : $("#user-avatar").attr("src", AVATAR_NONE_URL)
}