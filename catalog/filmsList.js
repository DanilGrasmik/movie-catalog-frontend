const POSTER_NONE_URL = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"

$(document).ready(function (){
    LoadFilmsList()
})

$(window).on('hashchange', function(){
    if(window.location.href.toString().includes("catalog")){
        LoadFilmsList()
    }
});

function LoadFilmsList(){
     const fetchMovie =  function(id){
        return response = fetch(`${URL}/api/movies/${id}`)
    };
    let f = document.location.hash !== "" ? fetchMovie(document.location.hash.substring(1)) : fetchMovie(1)
        f.then((response) => {
            return response.json();
        })
        .then((json) => {

            $("#films-list").empty();
            $template = $("#films-list-element-template");
            for (let film of json.movies) {
                $filmsCard = $template.clone();
                $filmsCard.removeClass("d-none");
                $filmsCard.attr("id", "film-" + film.id);
                $filmsCard.find(".film-country").text(film.country !== null ? film.country : "-");
                $filmsCard.find(".film-poster").attr("src", film.poster !== null ? film.poster : POSTER_NONE_URL)
                $filmsCard.find(".film-name").text(film.name !== null ? film.name : '-');
                $filmsCard.find(".film-year").text(film.year);
                $filmsCard.find(".film-reviews").click(function (e) {
                    window.location.href = `../movie#${film.id}`
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