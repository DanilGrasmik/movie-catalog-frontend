$(document).ready(function (){
    LoadReviewsList()
})

function LoadReviewsList(){
    let movieId = window.location.hash.substring(1)
    fetch(`https://react-midterm.kreosoft.space/api/movies/details/${movieId}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
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

                $reviewCard.attr("id", review.id);
                $reviewCard.find(".review-text").text(review.reviewText);
                $reviewCard.find(".review-create-date-time").text(getFormattedDate(review.createDateTime));

                $reviewCard.find(".review-rating").text(review.rating);
                review.rating < 6 ? $reviewCard.find(".card").addClass("border-danger") : $reviewCard.find(".card").addClass("border-success");
                review.rating < 6 ? $reviewCard.find(".review-rating").addClass("bg-danger") : $reviewCard.find(".review-rating").addClass("bg-success");

                if(!review.isAnonymous && review.author.userId === localStorage.getItem('userId')){
                    $reviewCard.find('.self-review-buttons').removeClass('d-none')
                    $reviewCard.find(".review-nick-name").text(review.author.nickName + " (Мой отзыв)")
                    $('#add-review').addClass('d-none')
                }

                $reviewCard.find('.button-review-edit').click(function (){
                    ReviewOnEdit($reviewCard)
                    $reviewCard.find('#input-edit-text').val($('.review-text').text())
                    $reviewCard.find('#input-edit-rating').val($('.review-rating').text())
                })
                $reviewCard.find('.button-review-save').click(function (){
                    ReviewNoEdit($reviewCard)
                    PutReviewData($reviewCard, review.id)
                })

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

function ReviewOnEdit(reviewCard){
    reviewCard.find('.review').removeClass('review-no-edit')
    reviewCard.find('.review').addClass('review-on-edit')
}

function ReviewNoEdit(reviewCard){
    reviewCard.find('.review').addClass('review-no-edit')
    reviewCard.find('.review').removeClass('review-on-edit')
}