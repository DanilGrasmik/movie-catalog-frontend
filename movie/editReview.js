function PutReviewData(reviewCard, reviewId){
    let data = SerializeReviewForm(reviewCard)
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

function SerializeReviewForm(reviewCard) {
    let reviewText = reviewCard.find('#input-edit-text').val()
    let rating = reviewCard.find('#input-edit-rating').val()
    let isAnonymous = reviewCard.find('#check-edit-anon').is(':checked')
    console.log(reviewText, rating, isAnonymous)
    return {
        "reviewText": reviewText,
        "rating": rating,
        "isAnonymous": isAnonymous
    }
}
