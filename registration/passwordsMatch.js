$(document).ready(function (){
    $("#button-submit").click(function (){checkPasswordsIdentity()})
})

function checkPasswordsIdentity(){
    let password = $("#input-password").val()
    if(password.length < 6){
        $("#input-password").addClass("is-invalid")
    } else {
        $("#input-password").removeClass("is-invalid")
    }
    let confirmPassword = $("#input-confirm-password").val()
    if(password !== confirmPassword){
        $("#input-confirm-password").addClass("is-invalid")
    } else {
        $("#input-confirm-password").removeClass("is-invalid")
    }
}