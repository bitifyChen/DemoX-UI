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
    //資料
    let bannerArr = [];

    //API
    function api_banner_add(formdata) {
        $.ajax({
            headers: {
                'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            url: curationBannerApiUrl,
            type: 'POST',
            data: formdata,
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                bannerArr.push(data['id']);
            }
        });
    };

    // 分別上傳
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
    return bannerArr
}

//introduction
function introductionSubmit() {
    //資料
    let introductionArr = [];

    //API
    function api_introduction_add(formdata) {
        $.ajax({
            headers: {
                'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            url: curationIntroductionApiUrl,
            type: 'POST',
            data: formdata,
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                introductionArr.push(data['id'])
            }
        });
    };

    //分別上傳
    $('#module .module_box_Introduction').each(function () {
        let title = $(this).find('.title').html();
        let editor_id = 'Introduction_editor_' + $(this).attr('id').split('_')[1];
        let content = CKEDITOR.instances[editor_id].getData();
        let introduction_id = $(this).attr('data-introduction-id');
        let sort = $(this).attr('data-introduction-sort');

        //建立FormData
        var formDataToUpload = new FormData();
        if (introduction_id) {
            formDataToUpload.append('id', introduction_id);
        }

        formDataToUpload.append('title', title);
        formDataToUpload.append('content', content);
        formDataToUpload.append('sort', sort);
        api_introduction_add(formDataToUpload);

    });

    return introductionArr
}

//Public
const publicName = ['public', 'curation_only', 'private']

function publicSubmit() {
    const publicInfo = {
        public: {title: '策展在DEMOX公開', subTitle: '大眾看到此策展與其中作品'},
        curation_only: {title: '僅學生與您可以', subTitle: '看到此策展與其中作品'},
        private: {title: '僅您可以', subTitle: '看到此策展與其中作品'},
    }
    let public_mode_btn = $('#public_mode_btn').prop('checked');
    let curation_mode_btn = $('#curation_mode_btn').prop('checked');
    if (public_mode_btn) {
        publicInfoBox(publicInfo.public.title, publicInfo.public.subTitle)
        return publicName[0]
    } else if (curation_mode_btn) {
        publicInfoBox(publicInfo.curation_only.title, publicInfo.curation_only.subTitle)
        return publicName[1]
    } else {
        publicInfoBox(publicInfo.private.title, publicInfo.private.subTitle)
        return publicName[2]
    }
}

function publicSet(name) {
    //確認是否有此狀態
    if (publicName.includes(name)) {
        if (name === publicName[0]) {
            $('#public_mode_btn').bootstrapToggle('on', true);
            $('#curation_mode_btn').bootstrapToggle('on', true);
        } else if (name === publicName[1]) {
            $('#public_mode_btn').bootstrapToggle('off', true);
            $('#curation_mode_btn').bootstrapToggle('on', true);
        } else {
            $('#public_mode_btn').bootstrapToggle('off', true);
            $('#curation_mode_btn').bootstrapToggle('off', true);
        }

    }
}

function publicInfoBox(title, subTitle) {
    $('#publicInfoBox > .title').html(title)
    $('#publicInfoBox > .sub-title').html(subTitle)
}


//Idea Public
function ideaPublicSubmit() {
    return $('#IinC_public_mode_btn').prop('checked')
}

function ideaPublicSet(mode) {
    //確認是否有此狀態
    if (mode) {
        $('#IinC_public_mode_btn').bootstrapToggle('on', true);
    } else {
        $('#IinC_public_mode_btn').bootstrapToggle('off', true);
    }
}

function api_idea_in_curation_public(formdata, status) {
    $.ajax({
        headers: {
            'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        url: ideaInCurationApiUrl,
        type: 'POST',
        data: formdata,
        processData: false,
        contentType: false,
        success: function () {
            if (status) {
                new Noty({type: 'success', text: '作品已公開於您的策展', timeout: 3000,}).show();
            } else {
                new Noty({type: 'success', text: '作品已隱藏於您的策展', timeout: 3000,}).show();
            }
        },
        error: function (result) {

            new Noty({type: 'error', layout: 'topRight', text: '錯誤，請重新嘗試。', timeout: 2000,}).show();
        }
    });
}