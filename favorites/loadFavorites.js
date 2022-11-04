$(document).ready(function (){
    AuthorizationCheck()
    LoadFavFilmsList()
})

function LoadFavFilmsList(){
    fetch(`${URL}/api/favorites`, {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem('token')
        })
    })
        .then(response => {
            return response.json()
        })
        .then((json) => {

            $("#films-fav-list").empty();
            $template = $("#films-list-element-template");
            for (let film of json.movies) {
                $filmsCard = $template.clone();
                $filmsCard.removeClass("d-none");
                $filmsCard.find(".film-country").text(film.country);
                $filmsCard.find(".film-poster").attr("src", film.poster)
                $filmsCard.find(".film-poster").attr("id", film.id)
                $filmsCard.find(".film-name").text(film.name);
                $filmsCard.find(".film-year").text(film.year);
                $filmsCard.find(".button-delete").click(function (e){
                    DeleteFilm(film.id)
                })
                $filmsCard.find(".link-movie-details").click(function (e) {
                    window.location.href = `../movie#${film.id}`
                    e.preventDefault()
                });
                GetAverageRating(film, $filmsCard)
                GetGenres(film, $filmsCard)
                $("#films-fav-list").append($filmsCard);
            }
        })
}


function GetGenres(film, filmsCard){
    for(let genre of film.genres){
        if(genre !== film.genres[film.genres.length - 1]) {
            filmsCard.find(".film-genres").append(genre.name + ', ');
        } else {
            filmsCard.find(".film-genres").append(genre.name);
        }
    }
}

function GetAverageRating(film, filmsCard){
    let sum = 0;
    for(let review of film.reviews) {
        sum += review.rating;
    }
    let averageReview = (sum / film.reviews.length).toFixed(1)
    if(sum > 0) {
        filmsCard.find(".film-reviews").append(averageReview);
    }
}

function DeleteFilm(movieId){
    fetch(`${URL}/api/favorites/${movieId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    })
        .then((response) => {
            LoadFavFilmsList()
            return response.json()
        })
        .catch(error => console.error(error));
}

function AuthorizationCheck(){
    if(localStorage.getItem('token') === null){
        window.location.href = "../noAuthorization"
    }
}