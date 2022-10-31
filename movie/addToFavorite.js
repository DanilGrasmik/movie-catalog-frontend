$('#button-favorite').click(function (){
    PostToFavorite()
    LoadDetails()
})

function PostToFavorite(favoriteMoviesId){
    let movieId = window.location.hash.substring(1)
    fetch(`${URL}/api/favorites/${movieId}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    })
        .then((response) => {
            return response.json()
        })
        .catch(error => console.error(error))
}