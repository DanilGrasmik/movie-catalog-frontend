$(document).ready(function (){
    LoadFilmsList()
})

function LoadFilmsList(){
    /*console.log(document.location.hash)
     const fetchMovie =  function(id){
        return response = fetch(`https://react-midterm.kreosoft.space/api/movies/${id}`)
    };
    let f = document.location.hash !== "" ? fetchMovie(document.location.hash.slice(-1)) : fetchMovie(1)
    console.log(document.location.hash.slice(-1))*/

    let pageNumber = localStorage.getItem('pageNumber')
    let response = fetch(`https://react-midterm.kreosoft.space/api/movies/${pageNumber}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {

            $('#films-list').empty();
            $template = $("#films-list-element-template");
            for (let film of json.movies) {
                $filmsCard = $template.clone();
                $filmsCard.removeClass("d-none");
                $filmsCard.attr("id", "film-" + film.id);
                $filmsCard.find(".film-country").text(film.country);
                $filmsCard.find(".film-poster").attr("src", film.poster)
                $filmsCard.find(".film-name").text(film.name);
                $filmsCard.find(".film-year").text(film.year);
                $filmsCard.find(".film-reviews").click(function (e) {
                    window.location.href = `/movie#${film.id}`
                    e.preventDefault()
                });
                GetAverageRating(film, $filmsCard)
                GetGenres(film, $filmsCard)
                $("#films-list").append($filmsCard);
            }
        }).catch(error => console.error(error));
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