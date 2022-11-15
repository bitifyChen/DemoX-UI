//組件計數器
let Introduction_num = 1;
let Introduction_example = false; //判斷是否使用過範例

//組件Html渲染
function module_Introduction(num) {
    let content = '<div class="module_box module_box_Introduction" id="Introduction_' + num + '" data-introduction-sort="' + num + '">\n' +
        '                    <div class="module_box_title">\n' +
        '                        <h3 class="title">文字區塊 ' + num + '</h3>\n' +
        '                    </div>\n' +
        '                    <div class="module_box_btn_list">\n' +
        '                        <button type="button" class="btn btn-info" onclick="module_edit(\'Introduction_' + num + '\')">編輯</button>\n' +
        '                        <button type="button" class="btn btn-danger" onclick="module_delete(\'Introduction_' + num + '\')">刪除</button>\n' +
        '                    </div>\n' +
        '                    <div class="form-group">' +
        '                      <textarea name="Introduction_editor_' + num + '"></textarea> ' +
        '                     </div> ' +
        '                   </div>';
    return content
}

function module_Introduction_example(num) {
    let content = '<div class="module_box module_box_Introduction" id="Introduction_0" data-introduction-sort="' + num + '">\n' +
        '                    <div class="module_box_title">\n' +
        '                        <h3 class="title">功能概述</h3>\n' +
        '                    </div>\n' +
        '                    <div class="module_box_btn_list">\n' +
        '                        <button type="button" class="btn btn-info" onclick="module_edit(\'Introduction_0\')">編輯</button>\n' +
        '                        <button type="button" class="btn btn-danger" onclick="module_delete(\'Introduction_0\')">刪除</button>\n' +
        '                    </div>\n' +
        '                    <div class="form-group">' +
        '                      <textarea name="Introduction_editor_0"></textarea> ' +
        '                     </div> ' +
        '                   </div>';
    return content
}

//組件-ADD
function module_add(name) {
    //判斷新增之組件
    if (name == 'Introduction') {
        //創建新組件
        $('#module').append(module_Introduction(Introduction_num));
        //組件CKEDITOR渲染
        CKEDITOR.replace('Introduction_editor_' + Introduction_num);
        Introduction_num += 1;
    }
    else if (name == 'Introduction-example') {
        if(Introduction_example){
             new Noty({type: 'error',text: '已達範例上限，請直接建立說明組件。', timeout: 2000,}).show();
        }
        else{
            //創建新組件
            $('#module').append(module_Introduction_example(Introduction_num));
            //組件CKEDITOR渲染
            CKEDITOR.replace('Introduction_editor_0');
            //CKEDITOR填入資料
            let example_content = '<p><span class="marker"><strong>你可以直接編輯此份文件!</strong></span></p>\n' +
                '<ol>\n' +
                '<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">策展：教師或策展者可以建立</span>\n' +
                '<ol>\n' +
                '<li style="font-weight: 400;" aria-level="2"><span style="font-weight: 400;">編輯策展：包含策展的首頁橫幅、策展說明、類別。</span></li>\n' +
                '<li style="font-weight: 400;" aria-level="2"><span style="font-weight: 400;">作品設定：設定或允許作品之公開。每個作品可以有三個公開模式：全公開、策展內公開、不公開。</span></li>\n' +
                '</ol>\n' +
                '</li>\n' +
                '<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">作品編輯&nbsp;</span>\n' +
                '<ol>\n' +
                '<li style="font-weight: 400;" aria-level="2"><span style="font-weight: 400;">每一作品可以上傳一個 PDF, 多個 Youtube 連接, Google slide 連結, Github 連接</span></li>\n' +
                '<li style="font-weight: 400;" aria-level="2"><span style="font-weight: 400;">作品由設計者群之一上傳，並由策展者審核後公開。</span></li>\n' +
                '</ol>\n' +
                '</li>\n' +
                '<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">觀看作品策展</span>\n' +
                '<ol>\n' +
                '<li style="font-weight: 400;" aria-level="2"><span style="font-weight: 400;">瀏覽策展內的作品。</span></li>\n' +
                '<li style="font-weight: 400;" aria-level="2"><span style="font-weight: 400;">可以針對作品按下「讚」。（未完成）</span></li>\n' +
                '</ol>\n' +
                '</li>\n' +
                '</ol>'
            CKEDITOR.instances.Introduction_editor_0.setData(example_content);
            //組件計數
            Introduction_num += 1;
            Introduction_example = true; //已使用過範例
        }
    }
    $("html,body").animate({scrollTop: $('.module_box').last().offset().top - 20}, 800);
}

//組件-EDIT
//組件編輯視窗
function module_edit(id) {
    //modal撰寫
    let name = $('#' + id).find('.title').html();
    let module = id.split('_')[0];
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
        '          </div>\n' +
        '          <div class="modal-footer">\n' +
        '            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>\n' +
        '            <button type="button" class="btn btn-primary" onclick="module_edited(\'' + id + '\')">儲存</button>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>';

    $('#editModal').html(edit_modal);
    //確認編輯完成
    $('#editModal').modal('show');
}

//組件編輯完成
function module_edited(id) {
    //儲存modal資料
    let name = $('#modal_name').val();
    //關閉modal視窗
    $('#editModal').modal('toggle');
    //組件渲染
    $('#' + id).find('.title').html(name)
    //通知
    new Noty({type: 'success', text: '編輯成功', timeout: 3000,}).show();
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
            if (module == 'Introduction') {
                let org_name = '文字區塊 ' + i//原始名稱
                let sorted_name = '文字區塊 ' + sorted_id//更新名稱
                //如果使用者未更新名稱
                if (name == org_name) {
                    $('#' + sorted_module_id).find('.title').html(sorted_name)
                }
            }
        }
    }
    //重新調整模組數量
    if (module == 'Introduction') {
        Introduction_num -= 1
    }

}

//組件-DELETE
function module_delete(id,categories_id) {
    var yes = confirm('您確定要刪除此組件嗎？');
    if (yes) {
        //組件刪除渲染
        $('#' + id).remove();
        //組件重新排序
        module_count(id);
        //刪除此ID
        let index = introductionArr.indexOf(categories_id);
        if (index > -1) {
          introductionArr.splice(index, 1);
        }
        categoriesArr = categoriesArr.filter(function(e) { return e !== 59 })
        //完成通知
        new Noty({type: 'success', text: '刪除成功', timeout: 3000,}).show();
    }
}


function bannerModal_btn_change(id) {
    let button_submit = '<button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button><button type="button" class="btn btn-primary" onclick="banner_add(\'' + id + '\')" disabled="disabled">儲存</button>';
    $('#bannerModal').find('.modal-footer').html(button_submit);
}

//banner modal 確認按鈕
function banner_add(id) {
    cropResult();
    let resp = $result.find('img').attr('src');
    //修改前端banner list 照片顯示
    $('#' + id).find('img').attr('src', resp);
    //修改前端banner list 網址顯示
    $('#' + id).find('span[data-url="banner_url"]').html($('#banner_url').val());

    //清除表單
    cropCancel();
    $('#banner_url').val('');
    //關閉表單
    $('#bannerModal').modal('toggle');

}

//組件編輯排序
function module_sort() {
    let sort_modal = '<div class="modal-dialog" role="document">\n' +
        '        <div class="modal-content">\n' +
        '          <div class="modal-header">\n' +
        '            <h5 class="modal-title">編輯排序</h5>\n' +
        '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '              <span aria-hidden="true">&times;</span>\n' +
        '            </button>\n' +
        '          </div>\n' +
        '          <div class="modal-body drag-sort-enable">\n' +
        '          </div>\n' +
        '          <div class="modal-footer">\n' +
        '            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>\n' +
        '            <button type="button" class="btn btn-primary" onclick="module_sorted()">儲存</button>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>';
    $('#sortModal').html(sort_modal);
    $('#module .module_box_Introduction').each(function () {
        let title = $(this).find('.title').html();
        let id = $(this).attr('id');
        $('#sortModal .modal-body').append('<div class="module_sort_box" data-id="' + id + '"><h5>' + title + '</h5></div>');
    })

    //拖拉功能
    function enableDragSort(listClass) {
        const sortableLists = document.getElementsByClassName(listClass);
        Array.prototype.map.call(sortableLists, (list) => {
            enableDragList(list)
        });
    }

    function enableDragList(list) {
        Array.prototype.map.call(list.children, (item) => {
            enableDragItem(item)
        });
    }

    function enableDragItem(item) {
        item.setAttribute('draggable', true)
        item.ondrag = handleDrag;
        item.ondragend = handleDrop;
    }

    function handleDrag(item) {
        const selectedItem = item.target,
            list = selectedItem.parentNode,
            x = event.clientX,
            y = event.clientY;

        selectedItem.classList.add('drag-sort-active');
        let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

        if (list === swapItem.parentNode) {
            swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
            list.insertBefore(selectedItem, swapItem);
        }
    }

    function handleDrop(item) {
        item.target.classList.remove('drag-sort-active');
    }

    (() => {
        enableDragSort('drag-sort-enable')
    })();
    //確認編輯完成
    $('#sortModal').modal('show');

}

function module_sorted() {
    let sort_num = 1;
    $('#sortModal .module_sort_box').each(function () {
        let id = $(this).attr('data-id');
        $('#' + id).attr('data-introduction-sort', sort_num);
        sort_num += 1;
    })
    //確認編輯完成
    $('#sortModal').modal('toggle');
    new Noty({
        type: 'success',
        layout: 'topCenter',
        text: '排序修改完成，待此次修改儲存後，排序即會生效。',
        timeout: 2000,
    }).show();
}