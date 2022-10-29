$('#button-favorite').click(function (){
    PostToFavorite()
})

function PostToFavorite(favoriteMoviesId){
    let movieId = window.location.hash.substring(1)
    fetch(`https://react-midterm.kreosoft.space/api/favorites/${movieId}/add`, {
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