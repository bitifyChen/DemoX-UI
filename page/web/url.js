//通用型
//URL LINK
function go_url(url) {
    location.href = url;
}

//IDEA
function url_idea_edit(id) {
    let host = window.location.origin;
    let url = host + '/setting/idea/edit/?func=edit_idea?id=' + id;
    return url
}

function url_idea_detail(id) {
    let host = window.location.origin;
    let url = host + '/idea/detail/?id=' + id;
    return url
}

//CURATION
function url_curation_edit(id) {
    let host = window.location.origin;
    let url = host + '/setting/curation/edit/?func=edit_idea?id=' + id;
    return url
}

function url_curation_detail(id) {
    let host = window.location.origin;
    let url = host + '/curation/detail/?id=' + id;
    return url
}


// //TAG_SEARCH--暫時失效
// $('.badge-tag').click(function () {
//     let host = window.location.origin;
//     let q = $(this).html();
//     let url = host + '/search/?q=' + q;
//     go_url(url);
// });