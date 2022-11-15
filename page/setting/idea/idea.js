//categories
function selectSubmit() {
    let categoriesArr = [];
    if ($('#Select').data('select2')) {
        $('#Select').select2('data').forEach((item) => {
            categoriesArr.push(item.text);
        })
    }
    return categoriesArr
}

//banner
function bannerSubmit() {
    //取得照片 base64
    let resp = $('.module_box_banner').find("img").attr('src');
    if (resp != '') {
        //取得照片 url
        let url = $(this).find('span[data-url="banner_url"]').html();
        //base64 to blob
        // Split the base64 string in data and contentType
        var block = resp.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1];// In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
        // Convert it to a blob to upload
        var blob = b64toBlob(realData, contentType);
        return blob;
    }
    return ''
}


//component
function componentSubmit() {
    let componentArr = []
    api_component_data()

    function api_component_data() {
        $('#module .module_box').each(function () {
            let type = $(this).attr("id").split('_')[0];
            let sort = $(this).attr("id").split('_')[1];
            let resort = $(this).attr('data-sort');
            if (resort) {
                sort = resort;
            }
            let name = $(this).find('.title').html();
            let id = $(this).attr("data-id")
            //pdf--->檔案上傳api
            if (type == 'pdf') {
                let pdf_file_id = '#pdf_file_' + $(this).attr("id").split('_')[1];
                var f_obj = $(pdf_file_id).get(0).files[0];             //獲取上傳檔案資訊
                var data = new FormData();                                      //建立formdata物件，便於將檔案傳輸到後端
                data.append("file", f_obj)                                      //在formdata物件中新增(封裝)檔案物件
                data.append('type', 'pdf')
                data.append('name', name)
                data.append('sort', sort)
                data.append('id', id)
                api_pdf_add(data);
            }
            //GIT hub & Google Doc & Youtube--->json形式上傳api
            else {
                if (type == 'google') {
                    type = 'google_docs'
                }
                //iframe網址蒐集
                let url = $(this).find('iframe').attr('src');
                //github網址蒐集
                if ($(this).find('input').val()) {
                    url = $(this).find('input').val();
                }
                api_component_add(type, name, url, sort, id)
            }
        })
    }

    //component上傳
    function api_component_add(type, name, url, sort, id) {
        let data = {'type': type, 'name': name, 'url': url, 'sort': sort, 'id': id}
        if (data) {
            $.ajax({
                url: componentApiUrl,
                method: 'POST',
                data: data,
                async: false,
                headers: {
                    'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
                },
                success: function (data) {
                    componentArr.push(data['id'])
                }
            });
        }
    }

    function api_pdf_add(data) {
        $.ajax({
            url: componentApiUrl,
            type: 'POST',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            async: false,
            headers: {
                'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            success: function (data) {
                componentArr.push(data['id'])
            }
        })
    }

    return componentArr
}

//Public
function is_authed_btn(ans) {
    is_authed = ans;
    $('#PublicModal').modal('toggle');
}

$(function () {
    $('#public_mode_btn').change(function () {
        let mode = $(this).prop('checked');
        if (mode) {
            $('#PublicModal').modal('show');
        }
    })
})

//聲明書關掉後檢查狀況
$('#PublicModal').on('hidden.bs.modal', function () {
    if (!is_authed) {
        $('#public_mode_btn').bootstrapToggle('off', true);
    }
});

function publicSubmit() {
    let public_mode_btn = document.getElementById('public_mode_btn').checked
    if (public_mode_btn) {
        return 'public'
    } else {
        return 'private'
    }
}

//作品加入策展
// 作品加入至策展相關 js
function curation_add(id, name, image) {
    let box = '<div class="module_box"> ' +
        '   <div class="row"> ' +
        '       <div class="col-md-3"> ' +
        '           <img src="' + image + '" class="img-fluid" width="100%" alt=""> </div> ' +
        '       <div class="col-md-9"> ' +
        '           <h3 class="title">' + name + '</h3> ' +
        '           <p>您的作品目前可以在' + name + '被瀏覽。</p>' +
        '       </div> ' +
        '   </div> ' +
        '</div>';
    $('#curation_join_box').append(box);

}

//API--策展代碼回傳策展ID
function api_curation_verify() {
    //獲得input 邀請碼
    let code = $('input#curation_join_code').val();
    $.ajax({
        url: curationVerifyApiUrl,
        method: 'GET',
        data: {'code': code},
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (data) {
            api_curation_info(data['id'], code, data['joined']);
        },
        error: function (result) {
            if (result.status == 404) {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: '無此驗證碼，請重新確認。',
                    timeout: 2000,
                }).show();
            }
        }
    });

}

//API--策展ID回傳策展資訊
function api_curation_info(id, code) {
    let data = {'id': id};
    $.ajax({
        url: curationGetApiUrl,
        method: 'GET',
        data: data,
        success: function (data_org) {
            let data = data_org['curation'];
            curation_join_box(data['id'], data['name'], data['description'], data['public_mode'], data['banner'], code);
        }
    });

}

//前端渲染 curation_join_box策展資訊相關
function curation_join_box(id, name, description, mode, banner, code) {
    let box = '<div class="module_box"> ' +
        '   <div class="row"> ' +
        '       <div class="col-md-3"> ' +
        '           <img src="' + banner + '" class="img-fluid" width="100%" alt=""> </div> ' +
        '       <div class="col-md-9"> ' +
        '           <h3 class="title">' + name + '</h3> ' +
        '           <p class="sub_title">' + description + '</p> ' +
        '       </div> ' +
        '       <div class="col-md-12 d-flex justify-content-center"> ' +
        '           <button type="button" class="btn btn-info" id="curation_join_btn"onclick="curation_join_check(\'' + code + '\')">將作品加入此策展</button> ' +
        '       </div> ' +
        '   </div> ' +
        '</div>';
    $('#curation_join_box').hide().html(box).fadeIn('slow');
}

//確認將作品加入此策展
let curation_invited_code = '';

function curation_join_check(code) {
    new Noty({
        type: 'success',
        layout: 'topCenter',
        text: '等待作品建立完成，系統將替您加入此策展。',
        timeout: 2000,
    }).show();
    //變更按鈕
    $('button#curation_join_btn').removeClass('btn-info').addClass('btn-secondary');
    $('button#curation_join_btn').attr('disabled', true);
    $('button#curation_join_btn').html('已確認，等待作品建立完成，將替您加入此策展。')

    curation_invited_code = code;
}

//API--IDEA加入策展
function api_curation_join(id) {
    let data = {'id': id, 'code': curation_invited_code};
    $.ajax({
        url: curationJoinApiUrl,
        method: 'POST',
        data: data,
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function () {
        },
    });
}

//API--IDEA觀摩碼
function api_idea_observe() {
    //獲得input 邀請碼
    let code = $('input#idea_join_code').val();
    $.ajax({
        url: ideaVerifyApiUrl,
        method: 'GET',
        data: {'code': code},
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (data) {
            idea_observe_box(data['id'], data['name'], data['description'], code);
        },
        error: function (result) {
            if (result.status == 404) {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: '無此驗證碼，請重新確認。',
                    timeout: 2000,
                }).show();
            }
        }
    });
}

//前端渲染 curation_join_box策展資訊相關
function idea_observe_box(id, name, description, code) {
    let box = '<div class="module_box"> ' +
        '   <div class="row"> ' +
        '       <div class="col-12"> ' +
        '           <h3 class="title">' + name + '</h3> ' +
        '           <p class="sub_title">' + description + '</p> ' +
        '       </div> ' +
        '       <div class="col-md-12 d-flex justify-content-center"> ' +
        '           <button type="button" class="btn btn-info" id="curation_join_btn"onclick="idea_observe_check(\'' + id + '\',\'' + code + '\')">觀摩此作品</button> ' +
        '       </div> ' +
        '   </div> ' +
        '</div>';
    $('#idea_join_box').hide().html(box).fadeIn('slow');
}

function idea_observe_check(id, code) {
    $.ajax({
        url: ideaVerifyApiUrl,
        method: 'POST',
        data: {'id': id, 'code': code},
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (data) {
            window.location.reload();
        },
        error: function (result) {
            new Noty({type: 'error', layout: 'topRight', text: '錯誤，請重新操作。', timeout: 2000,}).show();

        }
    });
}