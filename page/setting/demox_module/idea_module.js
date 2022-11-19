
//組件Html
function module_Google(num,name,id,url,module_num) {
    let default_url =  'https://docs.google.com/presentation/d/e/2PACX-1vTCV5zumnSdPojs8GHhPgILk-DgWZtvl7Yu1622jiBbPhYqqaxbVjUOB_wR8HT18uOBIkGw92F52G_q/embed?start=false&loop=false&delayms=3000';
    let default_name = 'Google Slide'+ num ;
    let default_id = '';
    if(url){
        default_url = url ;
    }
    if(name){
        default_name = name ;
    }
    if(id){
        default_id = id ;
    }
    let content = '<div class="module_box module_box_google" id="google_' + num + '"data-id ="' + default_id + '" data-sort="' + module_num + '">\n' +
        '                    <div class="module_box_title">\n' +
        '                        <h3 class="title">' + default_name + '</h3>\n' +
        '                    </div>\n' +
        '                    <div class="module_box_btn_list">\n' +
        '                        <button type="button" class="btn btn-info" onclick="module_edit(\'google_' + num + '\')">編輯</button>\n' +
        '                        <button type="button" class="btn btn-danger" onclick="module_delete(\'google_' + num + '\')">刪除</button>\n' +
        '                    </div>\n' +
        '                    <iframe src="' + default_url + '"\n' +
        '                            frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true"\n' +
        '                            webkitallowfullscreen="true"></iframe>\n' +
        '                </div>';
    return content
}

function module_Youtube(num,name,id,url,module_num) {
    let default_url =  'https://www.youtube.com/embed/uQQtOWd0g9s';
    let default_name = 'Youtube'+ num ;
    let default_id = '';
    if(url){
        default_url = url ;
    }
    if(name){
        default_name = name ;
    }
    if(id){
        default_id = id ;
    }
    let content = '<div class="module_box module_box_youtube" id="youtube_' + num + '"data-id ="' + default_id + '" data-sort="' + module_num + '">\n' +
        '                        <div class="module_box_title">\n' +
        '                            <h3 class="title">' + default_name + '</h3>\n' +
        '                        </div>\n' +
        '                    <div class="module_box_btn_list">\n' +
        '                        <button type="button" class="btn btn-info" onclick="module_edit(\'youtube_' + num + '\')">編輯</button>\n' +
        '                        <button type="button" class="btn btn-danger" onclick="module_delete(\'youtube_' + num + '\')">刪除</button>\n' +
        '                    </div>\n' +
        '                        <iframe width="560" height="315" src="' + default_url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n' +
        '                    </div>';
    return content
}

function module_PDF(num,name,id,filename,module_num) {
    let default_id = '';
    let default_filename = '';
    let default_name = 'PDF'+ num ;
    if(id){
        default_id = id ;
    }
    if(name){
        default_name = name ;
    }
    if(filename){
        default_filename = filename;
    }
    let content = '<div class="module_box module_box_pdf" id="pdf_' + num + '"data-id ="' + default_id + '" data-sort="' + module_num + '">\n' +
        '               <div class="module_box_title">\n' +
        '                   <h3 class="title">' + default_name + '</h3>\n' +
        '               </div>\n' +
        '               <div class="module_box_btn_list">\n' +
        '                    <button type="button" class="btn btn-info" onclick="module_edit(\'pdf_' + num + '\')">編輯</button>\n' +
        '                    <button type="button" class="btn btn-danger" onclick="module_delete(\'pdf_' + num + '\')">刪除</button>\n' +
        '                </div>\n' +
        '                <p>' + default_filename + '</P>' +
        '                <input type="file" class="form-control-file" id="pdf_file_' + num + '">'
    '           </div>';
    return content
}

function module_Git(num,name,id,url,module_num) {
    let default_url =  'https://demox.tw';
    let default_name = 'Link'+ num ;
    let default_id = '';
    if(url){
        default_url = url ;
    }
    if(name){
        default_name = name ;
    }
    if(id){
        default_id = id ;
    }
    let content = '<div class="module_box module_box_git" id="github_' + num + '"data-id ="' + default_id + '" data-sort="' + module_num + '">\n' +
        '               <div class="module_box_title">\n' +
        '                   <h3 class="title">' + default_name + '</h3>\n' +
        '               </div>\n' +
        '               <div class="module_box_btn_list">\n' +
        '                    <button type="button" class="btn btn-info" onclick="module_edit(\'github_' + num + '\')">編輯</button>\n' +
        '                    <button type="button" class="btn btn-danger" onclick="module_delete(\'github_' + num + '\')">刪除</button>\n' +
        '                </div>\n' +
        '                <input type="text" class="form-control" id="git_url_' + num + '" placeholder="請輸入網址" value="' + default_url + '" disabled="disabled">'
    '           </div>';
    return content
}

//組件新增
// let module_content = '';
let google_num = 1;
let youtube_num = 1;
let pdf_num = 1;
let github_num = 1;
let module_num = 1;

function module_add(type,name,id,url) {
    //判斷新增之組件
    if (type == 'Google' || type == 'google_docs') {
        $('#module').append(module_Google(google_num,name,id,url,module_num));
        google_num += 1;
    } else if (type == 'Youtube' || type == 'youtube') {
        $('#module').append(module_Youtube(youtube_num,name,id,url,module_num));
        youtube_num += 1;
    } else if (type == 'PDF' || type == 'pdf') {
        //限制PDF上限
        if(pdf_num <= 1){
           $('#module').append(module_PDF(pdf_num,name,id,url,module_num));
            pdf_num += 1;
        }
        else{
            new Noty({type: 'error',text: '已達PDF上限，PDF僅能上傳一件。', timeout: 2000,}).show();
        }

    } else if (type == 'Git' || type == 'github') {
        $('#module').append(module_Git(github_num,name,id,url,module_num));
        github_num += 1;
    }
    module_num += 1
    // $("html,body").animate({scrollTop: $('.module_box').last().offset().top - 20}, 800);
}

//組件-SORT重新計數
function module_count(id) {
    let module = id.split('_')[0];
    let num = parseInt(id.split('_')[1]);
    let all_num = eval(module + '_num') - 1;
    if (num < all_num) {
        for (i = num + 1; i < all_num + 1; i++) {
            //更新組件id
            let now_module_id = '#' + module + '_' + i;
            let sorted_id = (i - 1).toString();
            let sorted_module_id = module + '_' + sorted_id
            $(now_module_id).attr('id', sorted_module_id)
            //更新組件按鈕
            //編輯按鈕
            $('#' + sorted_module_id + ' button.btn-info').attr('onclick', 'module_edit("' + sorted_module_id + '")')
            //刪除按鈕
            $('#' + sorted_module_id + ' button.btn-danger').attr('onclick', 'module_delete("' + sorted_module_id + '")')
            //更新組件名稱
            let name = $('#' + sorted_module_id).find('.title').html();
            if (module == 'google') {
                let org_name = 'Google Doc ' + i//原始名稱
                let sorted_name = 'Google Doc ' + sorted_id//更新名稱
                //如果使用者未更新名稱
                if (name == org_name) {
                    $('#' + sorted_module_id).find('.title').html(sorted_name)
                }
            } else if (module == 'youtube') {
                let org_name = 'Youtube' + i//原始名稱
                let sorted_name = 'Youtube' + sorted_id//更新名稱
                //如果使用者未更新名稱
                if (name == org_name) {
                    $('#' + sorted_module_id).find('.title').html(sorted_name)
                }
            } else if (module == 'pdf') {
                let org_name = 'PDF' + i//原始名稱
                let sorted_name = 'PDF' + sorted_id//更新名稱
                //如果使用者未更新名稱
                if (name == org_name) {
                    $('#' + sorted_module_id).find('.title').html(sorted_name)
                }

            } else if (module == 'github') {
                let org_name = 'Git' + i//原始名稱
                let sorted_name = 'Git' + sorted_id//更新名稱
                //如果使用者未更新名稱
                if (name == org_name) {
                    $('#' + sorted_module_id).find('.title').html(sorted_name)
                }
            }
        }
    }
    //重新調整模組數量
    if (module == 'google') {
        google_num -= 1
    } else if (module == 'youtube') {
        youtube_num -= 1
    } else if (module == 'pdf') {
        pdf_num -= 1
    } else if (module == 'github') {
        github_num -= 1
    }

}

//組件編輯視窗
function module_edit(id) {
    //modal撰寫
    let name = $('#' + id).find('.title').html();
    let url = $('#' + id).find('iframe').attr('src');
    let module = id.split('_')[0];
    if (module == 'github') {
        url = $('#' + id).find('input').val();
    }
    let edit_modal = '<div class="modal-dialog" role="document">\n' +
        '        <div class="modal-content">\n' +
        '          <div class="modal-header">\n' +
        '            <h5 class="modal-title">編輯組件</h5>\n' +
        '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '              <span aria-hidden="true">&times;</span>\n' +
        '            </button>\n' +
        '          </div>\n' +
        '          <div class="modal-body">\n' +
        '              <label for="modal_name">組件命名：</label><br>\n' +
        '              <input type="text" id="modal_name" name="modal_name" placeholder="' + name + '" value="' + name + '"><br>\n' +
        '              <label for="modal_url">組件網址：</label><br>\n' +
        '              <input type="text" id="modal_url" name="modal_url" value="' + url + '"><br><br>\n' +
        '          </div>\n' +
        '          <div class="modal-footer">\n' +
        '            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>\n' +
        '            <button type="button" class="btn btn-primary" onclick="module_edited(\'' + id + '\')">儲存</button>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>';
    if (module == 'pdf') {
        edit_modal = '<div class="modal-dialog" role="document">\n' +
            '        <div class="modal-content">\n' +
            '          <div class="modal-header">\n' +
            '            <h5 class="modal-title">編輯組件</h5>\n' +
            '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
            '              <span aria-hidden="true">&times;</span>\n' +
            '            </button>\n' +
            '          </div>\n' +
            '          <div class="modal-body">\n' +
            '              <label for="modal_name">組件命名：</label><br>\n' +
            '              <input type="text" id="modal_name" name="modal_name" placeholder="' + name + '"><br>\n' +
            '          </div>\n' +
            '          <div class="modal-footer">\n' +
            '            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>\n' +
            '            <button type="button" class="btn btn-primary" onclick="module_edited(\'' + id + '\')">儲存</button>\n' +
            '          </div>\n' +
            '        </div>\n' +
            '      </div>';
    }
    $('#editModal').html(edit_modal);
    //確認編輯完成
    $('#editModal').modal('show');
}

//組件編輯完成
function module_edited(id) {
    //儲存modal資料
    let name = $('#modal_name').val();
    let url = $('#modal_url').val();
    //擷取此模組type
    let module_name = id.split('_')[0];
    //如果是yt進行網址轉譯
    if(module_name === 'youtube'){
        if(youtube_url_to_embed(url)){
            url = youtube_url_to_embed(url);
        }
        //如果網址錯誤
        else if (youtube_url_to_embed(url) === false){
            new Noty({type: 'error', text: '請確認連結是否有問題。', timeout: 2000,}).show();
            return;
        }
    }
    //如果是google slide 進行網址轉譯
    if(module_name === 'google'){
        if(google_slide_url_to_embed(url)){
            url = google_slide_url_to_embed(url)
        }
        //如果網址錯誤
        else if (google_slide_url_to_embed(url) === false){
            new Noty({type: 'error', text: '請確認連結是否有問題，請瀏覽本簡報Google Slide 嵌入說明。', timeout: 2000,}).show();
            return;
        }
    }

    //關閉modal視窗
    $('#editModal').modal('toggle');
    //組件渲染
    $('#' + id).find('.title').html(name)
    if(module_name === 'google' || module_name === 'youtube'){
       $('#' + id).find(' iframe ').attr('src', url);
    }
    else if (module_name === 'github'){
        $('#' + id).find('input').val(url);
    }
    //通知
    new Noty({type: 'success', text: '編輯成功', timeout: 3000,}).show();
}

//組件刪除
function module_delete(id) {
    var yes = confirm('您確定要刪除此組件嗎？');
    if (yes) {
        //組件刪除渲染
        $('#' + id).remove();
        //組件重新排序
        module_count(id);
        //完成通知
        new Noty({type: 'success', text: '已移除，將於送出作品後生效。', timeout: 3000,}).show();
    }
}

function bannerModal_btn_change(id) {
    let button_submit = '<button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button><button type="button"              class="btn btn-primary" onclick="banner_add(\'' + id + '\')" disabled="disabled">儲存</button>';
    $('#bannerModal').find('.modal-footer').html(button_submit);
}

//banner modal 確認按鈕
function banner_add(id) {
    cropResult();
    let resp = $result.find('img').attr('src');
    //修改前端banner list 照片顯示
    $('#' + id).find('img').attr('src', resp);
    //確認是否變更過照片(idea.js)
    banner_change_check = true ;
    //清除表單
    cropCancel();
    $('#banner_url').val('');
    //關閉表單
    $('#bannerModal').modal('toggle');

}

// youtube轉譯
function youtube_url_to_embed(url){
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            url = 'https://www.youtube.com/embed/' + match[2];
            return url
        }
        else{
            return false
        }
    }
}

// google slide轉譯
function google_slide_url_to_embed(url){
    if(url.indexOf('docs.google') != -1 && url.indexOf('pub?') != -1){
        url = 'https://docs.google.com/presentation/d/e/' + url.split('/pub?')[0].split('/presentation/d/e/').pop() + '/embed?start=false&loop=false&delayms=3000' ;
        return url
    }
    else if(url.indexOf('docs.google') != -1 && url.indexOf('embed?') != -1){
        url = 'https://docs.google.com/presentation/d/e/' + url.split('/embed?')[0].split('/presentation/d/e/').pop() + '/embed?start=false&loop=false&delayms=3000' ;
        return url
    }
    else{
        return false
    }
}
