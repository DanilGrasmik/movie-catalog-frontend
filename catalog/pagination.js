$(document).ready(function (){
    LoadPaginationPages(1)
})

function LoadPaginationPages(currentPage){
    fetch(`${URL}/api/movies/1`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            $("#pagination-links").empty();
            CreatePaginationLinks(json.pageInfo.pageCount, currentPage)
            /*$template = $("#pagination-link-template");
            for(let pageCount = 0; pageCount < json.pageInfo.pageCount; pageCount++){
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
            }*/
            PrevAndNextPage(json)
        }).catch(error => console.error(error));
}

function CreatePaginationLinks(pageCount, currentPage){
    if(pageCount === 1){
        CreatePaginationLink(1)
    } else if(pageCount === 2){
        CreatePaginationLink(1)
        CreatePaginationLink(2)
        } else {
        if(currentPage === 1){
            CreatePaginationLink(1)
            CreatePaginationLink(2)
            CreatePaginationLink(3)
        } else if(currentPage === pageCount){
            CreatePaginationLink(currentPage - 2)
            CreatePaginationLink(currentPage - 1)
            CreatePaginationLink(currentPage)
        } else {
            CreatePaginationLink(currentPage - 1)
            CreatePaginationLink(currentPage)
            CreatePaginationLink(currentPage + 1)
        }
    }
}

function CreatePaginationLink(page){
    $template = $("#pagination-link-template");
    $paginationLink = $template.clone();
    $paginationLink.removeClass("d-none");
    $paginationLink.find(".page-link").text(page);
    $paginationLink.find(".page-link").attr("href", `#${page}`)
    $paginationLink.find(".page-link").click(function (e){
        window.location.href = `#${page}`
        LoadFilmsList()
        LoadPaginationPages(page)
        window.scrollTo(0, 0);
        e.preventDefault()
    });
    $("#pagination-links").append($paginationLink);
}

function PrevAndNextPage(json){
    $('#pagination-next-page').click(function (e){
        LoadPaginationPages(json.pageInfo.pageCount)
        window.location.href = `#${json.pageInfo.pageCount}`
        /*let prevPage = document.location.hash.slice(-1);
        if(parseInt(prevPage) !== json.pageInfo.pageCount) {
            if(prevPage === ""){
                prevPage = 1
            }
            window.location.href = `#${parseInt(prevPage) + 1}`
            LoadFilmsList()
            window.scrollTo(0, 0);
        } else {
            window.location.href = `#${prevPage}`
        }*/
        e.preventDefault()
    })
    $('#pagination-prev-page').click(function (e){
        LoadPaginationPages(1)
        window.location.href = '#1'
        /*let prevPage = document.location.hash.slice(-1);
        if(prevPage !== "1" && prevPage !== "") {
            window.location.href = `#${parseInt(prevPage) - 1}`
            LoadFilmsList()
            window.scrollTo(0, 0);
        } else {
            window.location.href = `#${prevPage}`
        }
        e.preventDefault()*/
    })
}