function DeleteReview(reviewId){
    let movieId = window.location.hash.substring(1)
    fetch(`${URL}/api/movie/${movieId}/review/${reviewId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    })
        .then((response) => {
            LoadReviewsList()
            $('#add-review').removeClass('d-none')
        })
        .catch(error => console.error(error));
}