function DeleteReview(reviewId){
    let movieId = window.location.hash.substring(1)
    fetch(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${reviewId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
        },
    })
        .then((response) => {
            LoadReviewsList()
            return response.json()
        })
        .catch(error => console.error(error));
}