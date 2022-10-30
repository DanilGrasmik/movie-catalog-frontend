function PutReviewData(reviewCard, reviewId, isAnonymous){
    let data = SerializeReviewForm(reviewCard, isAnonymous)
    let movieId = window.location.hash.substring(1)
    fetch(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${reviewId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
          LoadReviewsList()
        })
}

function SerializeReviewForm(reviewCard, isAnonymous) {
    let reviewText = reviewCard.find('#input-edit-text').val()
    let rating = reviewCard.find('#input-edit-rating').val()
    data = {
        "rating": rating,
        "isAnonymous": isAnonymous
    }
    if(reviewText !== ""){
        data.reviewText = reviewText
    }
    return data
}
