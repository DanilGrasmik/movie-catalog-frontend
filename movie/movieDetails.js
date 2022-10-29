$(document).ready(function (){
    LoadDetails()
})

function LoadDetails(){
    let movieId = window.location.hash.substring(1)
    fetch(`https://react-midterm.kreosoft.space/api/movies/details/${movieId}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            $( "#movie-details" ).find("#movie-poster").attr("src", json.poster)
            $( "#movie-details" ).find("#movie-description").text(json.description)
            $( "#movie-details" ).find("#movie-name").text(json.name)
            $( "#movie-details" ).find("#movie-year").text(json.year)
            $( "#movie-details" ).find("#movie-country").text(json.country)
            GetGenres(json)
            $( "#movie-details" ).find("#movie-time").text(`${json.time} мин.`)
            $( "#movie-details" ).find("#movie-tagline").text(json.tagline)
            $( "#movie-details" ).find("#movie-director").text(json.director)
            $( "#movie-details" ).find("#movie-budget").text(`${json.budget  !== null ? '$' + json.budget : "-"}`)
            $( "#movie-details" ).find("#movie-fees").text(`${json.fees  !== null ? '$' + json.fees : "-"}`)
            $( "#movie-details" ).find("#movie-age-limit").text(`${json.ageLimit}+`)


            IsMovieInFavorites(movieId).then(result =>{
                if(result) {
                    $('.details').addClass('in-favorite')
                    $('.details').removeClass('not-in-favorite')
                } else {
                    $('.details').addClass('not-in-favorite')
                    $('.details').removeClass('in-favorite')
                }
            })

        }).catch(error => console.error(error));

}

function IsMovieInFavorites(movieId){
    return fetch('https://react-midterm.kreosoft.space/api/favorites', {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem('token')
        })
    })
        .then(response => {
            return response.json()
        })
        .then((json) => {
            for (let film of json.movies) {
                if(film.id === movieId){
                    return true
                }
            }
            return false
        })
}
function GetGenres(movie){
    for(let genre of movie.genres){
        if(genre !== movie.genres[movie.genres.length - 1]) {
            $( "#movie-details" ).find("#movie-genres").append(genre.name + ', ');
        } else {
            $( "#movie-details" ).find("#movie-genres").append(genre.name);
        }
    }
}