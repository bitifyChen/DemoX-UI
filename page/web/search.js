//搜尋結果
let result_box_content_all = '';

//進入頁面初始化
$(function urlResults() {
    //載入頁面執行搜尋
    let q = decodeURI(new URL(window.location.href).search.split('?q=')[1]);
    if (q !== 'undefined') {
        //填入q
        $('#search').val(q)
    }
    //開始搜尋，如有帶值搜值，如未有值全站顯示
    getResults();
});


//從input取值
function getResults() {
    //清除結果
    result_box_content_all = ''
    let q = $('#search').val()
    api_search(q);
}

//顯示結果與渲染
function showResults() {
    $('#result').html(result_box_content_all);
    setTimeout(function(){
       $('#result').fadeIn(500);
       $('.grid').isotope('reloadItems').isotope();
    }, 500);

}

//清除結果
function clearResults() {
    $('#result').fadeOut(500);
    result_box_content_all = '';
}


//enter to search
$('#search').bind("enterKey", function (e) {
    getResults();
});
$('#search').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});

//content-box html
function result_box(id, name, banner, author, date, type) {
    let filter, url, badge;
    if (!banner) {
        if (id % 3 === 0) {
            banner = banner_1
        } else if (id % 3 === 1) {
            banner = banner_2
        } else {
            banner = banner_3
        }
    }
    if (type === 'idea') {
        filter = 'idea';
        url = 'url_idea_detail';
        badge = '<div class="content-box-badge"><span class="badge badge-idea">作品</span></div>';
    } else if (type === 'curation') {
        filter = 'curation';
        url = 'url_curation_detail';
        badge = '<div class="content-box-badge"><span class="badge badge-curation">策展</span></div>'
    }
    let result_box_content = '<div class="col-log-3 col-md-4 col-sm-12 element-item ' + filter + '" data-date="' + date + '">' +
        '<div class="content-box idea_box cursor_p" onclick=" go_url(' + url + '(' + id + '))">' +
        badge +
        '<img src="' + banner + '" class="img-fluid" width="100%" alt="">' +
        '<h4 class="idea_list_title name">' + name + '</h4>' +
        '<p class="sub_title author" >' + author + '</p>' +
        '</div>' +
        '</div>';

    return result_box_content
}
