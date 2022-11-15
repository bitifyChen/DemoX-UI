//----------------set selector----------------------
let $zone = $('.idea-list-nav'); //作品顯示區
let $zone_content = $('.idea-list-nav .ideas');//作品顯示區 - 可滑動區塊
let $pagination = $('.curation-bar .curation-pagination'); //分頁標籤區 - 分頁按鈕
//----------------start----------------------
//打開 idea-in-curation
//點擊
$pagination.click(function () {
    let curation_id = $(this).attr('data-curation-id');
    $pagination.removeClass('active');
    $(this).addClass('active');
    show_idea_list_nav(curation_id);
});

//主程式
function show_idea_list_nav(curation_id) {
    let ideas_content = idea_in_curation_main(curation_id);
    $zone_content.html(ideas_content);
    $zone.slideDown();  //開啟$zone

}

//關閉 idea-in-curation
//滑鼠離開
$(".idea-in-curation").mouseleave(function () {
    close_idea_list_nav();
});

//主程式
function close_idea_list_nav() {
    $pagination.removeClass('active');
    $zone.slideUp('slow');  //關閉$zone
}

//資料 to html
function idea_to_html(name, banner, views, likes, id) {
    let idea_content = '<a href="/idea/detail/?id= ' + id + '">' +
        ' <div class="idea"> ' +
        '<img src="' + banner + '" alt=""> ' +
        '<div class="info"> ' +
        '<h3 class="title">' + name + '</h3> ' +
        '<span class="views">' + views + '</span> ' +
        '<span class="likes">' + likes + '</span> ' +
        '</div> ' +
        '</div> '
    '</a>'
    return idea_content
}

//取得作品id by curation id
function api_curation_info(curation_id) {
    let data;
    $.ajax({
        url: api_url_curation_get,
        method: 'GET',
        data: {'id': curation_id},
        async: false,
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (data_org) {
            data = data_org['curation'];
        }

    });
    return data['ideas'];
}

//取得作品名稱、封面、按讚數、瀏覽量 by idea id
function api_idea_info(idea_id) {
    let data;
    $.ajax({
        url: api_url_idea_get,
        method: 'GET',
        data: {'id': idea_id},
        async: false,
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (data_org) {
            data = data_org['idea'];
        }
    });
    return data
}

//點擊 -> api_curation_info -> api_idea_info -> idea_to_html
function idea_in_curation_main(curation_id) {
    //curation id 去取得，在此策展中的ideas id
    let ideas_id = api_curation_info(curation_id);
    //由idea id 逐筆訪問idea api 取得資料
    let ideas_content = '';
    for (var i = 0; i < ideas_id.length; i++) {
        let data = api_idea_info(ideas_id[i]);
        let idea_name = data['name'];
        let idea_banner = data['cover_image'];
        //如果沒有圖片
        if (idea_banner == null) {
            idea_banner = '/static/pic/default-banner2.c9fd11f81fa3.svg';
        }
        ;
        let idea_views = data['page_views'];
        let idea_likes = data['like_users'];
        let idea_content = idea_to_html(idea_name, idea_banner, idea_views, idea_likes, ideas_id[i]);
        ideas_content += idea_content
    }
    return ideas_content
}


//dragscroll 設定-滑動不觸發點擊
$('.dragscroll').on('scroll', function () {
    $('.dragscroll a').on('click touch', function (event) {
        if (event.isDefaultPrevented()) {
            $('.dragscroll a').unbind('click touch').off(event);
            return true;
        } else {
            event.preventDefault();
        }
    });
});