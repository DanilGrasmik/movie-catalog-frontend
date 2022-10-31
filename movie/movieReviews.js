$(document).ready(function (){
    LoadReviewsList()
})

function LoadReviewsList(){
    let movieId = window.location.hash.substring(1)
    fetch(`${URL}/api/movies/details/${movieId}`)
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

                if(review.author !== null && review.author.userId === localStorage.getItem('userId')){
                    $reviewCard.find('.self-review-buttons').removeClass('d-none')
                    if(!review.isAnonymous) {
                        $reviewCard.find(".review-nick-name").text(review.author.nickName + " (Мой отзыв)")
                    } else {
                        $reviewCard.find(".review-nick-name").text ("Анонимный пользователь (Мой отзыв)")
                    }
                    $('#add-review').addClass('d-none')
                }

                $reviewCard.find('.button-review-delete').click(function (){
                    DeleteReview(review.id)
                })

                EditReview($reviewCard, review.id, review.isAnonymous)

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

function EditReview(reviewCard, reviewId, isAnonymous){
    reviewCard.find('.button-review-edit').click(function (){
        ReviewOnEdit(reviewCard)
        reviewCard.find('#input-edit-text').val(reviewCard.find('.review-text').text())
        reviewCard.find('#input-edit-rating').val(reviewCard.find('.review-rating').text())
    })
    reviewCard.find('.button-review-save').click(function (){
        ReviewNoEdit(reviewCard)
        PutReviewData(reviewCard, reviewId, isAnonymous)
    })
}

function ReviewOnEdit(reviewCard){
    reviewCard.find('.review').removeClass('review-no-edit')
    reviewCard.find('.review').addClass('review-on-edit')
}

function ReviewNoEdit(reviewCard){
    reviewCard.find('.review').addClass('review-no-edit')
    reviewCard.find('.review').removeClass('review-on-edit')
}