//-----------Arr 用於API 紀錄組件 ID LIST--------------
let curation_id ;
//banner 列表
let bannerArr = [];
function api_banner_data_list(banner_id) {
    bannerArr.push(banner_id);
}

//introduction 列表
let introductionArr = [];
function api_introduction_data_list(introduction_id) {
    introductionArr.push(introduction_id);
}
//tag 列表
let categoriesArr = []
function api_select_data() {
    if ($('#Select').data('select2')) {
        let data = $('#Select').select2('data')
        data.forEach(function (item) {
            categoriesArr.push(item.text);
        })
    }
    //檢查是否為空
    if (Object.keys(categoriesArr).length > 0) {
        return categoriesArr
    }
}

//-----------END--------------
//-----------data for curation API --------------
function api_curation_data() {
    var formDataToUpload = new FormData();
    //如果為舊策展
    if(curation_id){
        formDataToUpload.append('id', curation_id);
    }
    $('.curation_input').each(function () {
        let input_name = $(this).attr("name");
        let input_value = $(this).val();
        if (input_value) {
            formDataToUpload.append(input_name, input_value);
        }
    })
    //tag蒐集
    if (api_select_data()) {
        formDataToUpload.append('categories', JSON.stringify(categoriesArr));
    }
    //banner id 蒐集
    if (Object.keys(bannerArr).length != 0) {
        formDataToUpload.append('banners', JSON.stringify(bannerArr));
    }
    //introduction id 蒐集
    if (Object.keys(introductionArr).length != 0) {
        formDataToUpload.append('introductions', JSON.stringify(introductionArr));
    }
    //PUBLIC模式
    formDataToUpload.append('public_mode', api_public_data() );

    //Idea_PUBLIC模式
    formDataToUpload.append('default_idea_public',$('#IinC_public_mode_btn').prop('checked'));

    return formDataToUpload;
}
//-----------data for introduction API--------------
function api_introduction_data() {
    $('#module .module_box_Introduction').each(function () {
        let title = $(this).find('.title').html();
        let editor_id = 'Introduction_editor_' + $(this).attr('id').split('_')[1];
        let content = CKEDITOR.instances[editor_id].getData();
        let introduction_id = $(this).attr('data-introduction-id');
        let sort = $(this).attr('data-introduction-sort');

        //建立FormData
        var formDataToUpload = new FormData();
        if(introduction_id){
            formDataToUpload.append('id', introduction_id);
        }

        formDataToUpload.append('title', title);
        formDataToUpload.append('content', content);
        formDataToUpload.append('sort', sort);
        api_introduction_add(formDataToUpload);

    })
}
//-----------data for banner API--------------
function api_banner_data() {
    // sort 歸零
    let sort = 0;
    $('.module_box_banner').each(function () {
        //取得照片 base64
        let resp = $(this).find("img").attr('src');
        if (resp != '') {
            let id = $(this).find("img").attr('data-id');
            if (id) {
                //舊圖片
                let change = $(this).find("img").attr('data-change');
                if (change === 'false') {
                    return; //跳至下個迴圈
                }
            }
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
            //建立FormData
            var formDataToUpload = new FormData();
            formDataToUpload.append('image', blob);
            formDataToUpload.append('url', url);
            formDataToUpload.append('sort', sort);
            if (id) {
                formDataToUpload.append('id', id);
            }
            api_banner_add(formDataToUpload);
            //排序新增
            sort += 1;
        }
    });
}
//-----------END--------------
//-----------data for public API--------------
function api_public_data() {
    let public_mode_btn = $('#public_mode_btn').prop('checked');
    let curation_mode_btn = $('#curation_mode_btn').prop('checked');
    if (public_mode_btn) {
        return public_mode_name
    } else if (curation_mode_btn) {
        return curation_mode_name
    } else {
        return private_mode_name
    }
}
//-----------END--------------



//Switch 轉換
$('#public_mode_btn').change(function () {
    let mode = $(this).prop('checked');
    if (mode) {
        $('#curation_mode_btn').bootstrapToggle('on', true);
    }
})

$('#curation_mode_btn').change(function () {
    let mode = $(this).prop('checked');
    if (!mode) {
        $('#public_mode_btn').bootstrapToggle('off', true);
    }
})



//EDIT ONLY --偵測是否編輯
let edited_check = false;

//跳出儲存視窗
function edited(status) {
    if (status) {
        edited_check = true
        $('.submit-footer').fadeIn();
    } else if (!status) {
        edited_check = false
        $('.submit-footer').fadeOut();
    }
}

//偵測input有修改
$('.curation_input').change(function () {
    edited(true);
});
//偵測tag有修改
$('.tag').change(function () {
    edited(true);
});
//偵測圖片裁切過
$('#btnCrop').click(function () {
    edited(true);
});

//偵測組件如果有修改
$('body').on('DOMSubtreeModified', '#module', function () {
    let now_tab = 1;
    $(".tab").each(function () {
        if ($(this).is(":hidden")) {
            now_tab += 1;
        } else {
            return false;
        }
    });
    if (now_tab === 3) {
        edited(true);
    }
});

//偵測公開模式是否修改
$('#public_mode_btn').change(function () {
    edited(true);
});
$('#curation_mode_btn').change(function () {
    edited(true);
});

//偵測作品公開模式是否修改
$('#IinC_public_mode_btn').change(function () {
    edited(true);
});

//當離開或關閉網站時提醒
$(window).on("beforeunload", function () {
    if (edited_check) {
        return '您尚未儲存您的變更!';
    }
})