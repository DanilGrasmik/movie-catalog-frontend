$('#button-save-review').click(function (){
    PostReview(SerializeForm())
})

function PostReview(data){
    let movieId = window.location.hash.substring(1)
    fetch(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            LoadReviewsList()
        })
        .catch(error => console.error(error));
}

function SerializeForm() {
    let reviewText = $('#input-review-text').val()
    let rating = $('#input-review-rating').val()
    let isAnonymous = $('#check-anon').is(':checked')
    return {
        "reviewText": reviewText,
        "rating": rating,
        "isAnonymous": isAnonymous
    }
}