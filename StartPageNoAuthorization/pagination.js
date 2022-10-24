let pageNumbers = [];

$(document).ready(function (){
    LoadPaginationPages()
})

function LoadPaginationPages(){
    let response = fetch(`https://react-midterm.kreosoft.space/api/movies/1`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            $("#pagination-links").empty();
            $template = $("#pagination-link-template");
            for(let pageCount = 0; pageCount < json.pageInfo.pageCount; pageCount++){
                pageNumbers.push(pageCount + 1)
                $paginationLink = $template.clone();
                $paginationLink.removeClass("d-none");
                $paginationLink.find(".page-link").text(pageCount + 1);
                $paginationLink.find(".page-link").attr("href", `#${pageCount + 1}`)
                $paginationLink.find(".page-link").click(function (e){
                    localStorage.setItem('pageNumber', `${pageCount + 1}`)
                    LoadFilmsList()
                    window.scrollTo(0, 0);
                });
                $("#pagination-links").append($paginationLink);
            }
        }).catch(error => console.error(error));
}