//-----------Arr 用於API 紀錄組件 ID LIST--------------
//component 列表
let componentArr = [];
function api_component_data_list(component_id) {
    componentArr.push(component_id);
}

//tag 列表
let categoriesArr = [];
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

//banner 是否變更
let banner_change_check = false;

//-----------data for idea API --------------
function api_idea_data() {
    var formDataToUpload = new FormData();
    $('.idea_input').each(function () {
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
    if (banner_change_check) {
        formDataToUpload.append('cover_image', api_banner_data());
    }
    if (Object.keys(componentArr).length != 0) {
        formDataToUpload.append('components', JSON.stringify(componentArr));
    }
    //PUBLIC模式
    formDataToUpload.append('public_mode', api_public_data() );
    return formDataToUpload;
}

//-----------data for component API--------------
function api_component_data() {
    $('#module .module_box').each(function () {
        let type = $(this).attr("id").split('_')[0];
        let sort = $(this).attr("id").split('_')[1];
        let resort = $(this).attr('data-sort');
        if(resort){
            sort = resort ;
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
//-----------END--------------
//-----------data for banner API--------------
function api_banner_data() {
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
        return blob
    }
}
//-----------END--------------
//-----------data for PUBLIC API--------------
function api_public_data() {
    let public_mode_btn = document.getElementById('public_mode_btn').checked
    if(public_mode_btn){
        return public_mode_name
    }
    else{
        return private_mode_name
    }
}
//-----------END--------------
// 公開權限部分
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