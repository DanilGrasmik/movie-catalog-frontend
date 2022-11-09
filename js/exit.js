$("#button-exit").click(function (e){
    fetch(`${URL}/api/account/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then((response) => {
            localStorage.clear()
            window.location.reload()
        })
    e.preventDefault()
})