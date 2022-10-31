let pageNumbers = [];

$(document).ready(function (){
    LoadPaginationPages()
})

function LoadPaginationPages(){
    fetch(`${URL}/api/movies/1`)
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
                    window.location.href = `#${pageCount + 1}`
                    LoadFilmsList()
                    window.scrollTo(0, 0);
                    e.preventDefault()
                });
                $("#pagination-links").append($paginationLink);
            }
            PrevAndNextPage(json)
        }).catch(error => console.error(error));
}

function PrevAndNextPage(json){
    $('#pagination-next-page').click(function (e){
        let prevPage = document.location.hash.slice(-1);
        if(parseInt(prevPage) !== json.pageInfo.pageCount) {
            if(prevPage === ""){
                prevPage = 1
            }
            window.location.href = `#${parseInt(prevPage) + 1}`
            LoadFilmsList()
            window.scrollTo(0, 0);
        } else {
            window.location.href = `#${prevPage}`
        }
        e.preventDefault()
    })
    $('#pagination-prev-page').click(function (e){
        let prevPage = document.location.hash.slice(-1);
        if(prevPage !== "1" && prevPage !== "") {
            window.location.href = `#${parseInt(prevPage) - 1}`
            LoadFilmsList()
            window.scrollTo(0, 0);
        } else {
            window.location.href = `#${prevPage}`
        }
        e.preventDefault()
    })
}