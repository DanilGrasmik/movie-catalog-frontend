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
                $paginationLink = $template.clone();
                $paginationLink.removeClass("d-none");
                $paginationLink.find(".page-link").text(pageCount + 1);
                $("#pagination-links").append($paginationLink);
                $paginationLink.find(".page-link").click(function (){
                    LoadFilmsList(pageCount + 1);
                    window.scrollTo(0, 0);
                });
            }
        }).catch(error => console.error(error));

}