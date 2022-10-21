$(document).ready(function (){
    LoadReviewsList()
})

function LoadReviewsList(){
    let movieId = window.location.hash.substring(1)
    let response = fetch(`https://react-midterm.kreosoft.space/api/movies/details/${movieId}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            $("#reviews-list").empty();
            $template = $("#review-template");
            let $reviewCard;
            for (let review of json.reviews) {
                $reviewCard = $template.clone();
                $reviewCard.removeClass("d-none");

                if(!review.isAnonymous) {
                    $reviewCard.find(".review-nick-name").text(review.author.nickName)
                    if(review.author.avatar !== null) {
                        $reviewCard.find(".review-avatar").attr("src", review.author.avatar)
                    }
                }

                $reviewCard.attr("id", "review-" + review.id);
                $reviewCard.find(".review-text").text(review.reviewText);
                $reviewCard.find(".review-create-date-time").text(getFormattedDate(review.createDateTime));

                $reviewCard.find(".review-rating").text(review.rating);
                review.rating < 6 ? $reviewCard.find(".card").addClass("border-danger") : $reviewCard.find(".card").addClass("border-success");
                review.rating < 6 ? $reviewCard.find(".review-rating").addClass("bg-danger") : $reviewCard.find(".review-rating").addClass("bg-success");

                $("#reviews-list").append($reviewCard);
            }
        }).catch(error => console.error(error));

}

function getFormattedDate(datetime) {
    var date = new Date(datetime);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return day + '.' + month + '.' + year;
}