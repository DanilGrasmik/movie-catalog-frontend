$(document).ready(function (){
    $("#button-submit").click(function (){checkPasswordsIdentity()})
})

function checkPasswordsIdentity(){
    let password = $("#password-input").val()
    let confirmPassword = $("#confirm-password-input").val()
    if(password !== confirmPassword){
        $("#confirm-password-input").addClass("is-invalid")
    } else {
        $("#confirm-password-input").removeClass("is-invalid")
    }
}