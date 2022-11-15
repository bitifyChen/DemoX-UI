//起始函式
(function () {
    //DOM
    const sideBarItems = document.querySelectorAll('.sideBar nav a.item');
    const mainTitle = $('.main > h2.title');
    const paths = $('.main .path ul');
    const funcMenuItems = $('.funcMenu ul a li');
    //--【PATH SET】 (app-menu -> funcMenu)
    //---Get URL
    const url = window.location.href;
    const funcMenuName = url.split('?func=').pop().split('?id=')[0];

    //---function
    //----Path add
    function path_add(name) {
        paths.append(`<li>${name}</li>`);
    }

    //---app-menu(set sideBarItems.background + path)
    const urlPath = window.location.href.split('setting').pop()
    let pathsArr = urlPath.split('/').filter((e) => {
        return e != ''
    })
    //sideBar > nav .active
    if (pathsArr.length === 0) {
        let pathName = 'index'
        sideBarItems.forEach((item) => {
            if (pathName === item.dataset.name) {
                path_add(item.innerHTML)
                item.classList.add('active')
                titleSet('嗨，歡迎使用 DEMO X')
            }
        })
    }

    if (pathsArr.length > 0) {
        sideBarItems.forEach((item) => {
            if (pathsArr[0] === item.dataset.name) {
                path_add(item.innerHTML)
                item.classList.add('active')
                titleSet()
            }
        })
    }


    //---funcMenu(set path)
    //----如果url有func
    if (funcMenuItems.length > 0) {
        if (url.includes("?func=")) {
            //----funcBox .show
            funcBox_show(funcMenuName);
            //----funcMenuItems .active
            funcMenuItems.each(function () {
                if (funcMenuName === $(this).data('name')) {
                    //---funcMenu .active
                    $(this).addClass('active')
                    //---PATH set
                    path_add($(this).html())
                }
            });
        }
        //----如果未按過funcMenu，顯示第一個func box
        else {
            //---funcMenu .active
            funcMenuItems.first().addClass('active');
            //---PATH set
            path_add(funcMenuItems.first().html())
            //---funcBox .show
            funcBox_show(funcMenuItems.first().data('name'));
        }
    }


    //--【title SET】
    function titleSet(custom){
        if(custom){
           mainTitle.html(custom);
        }
        else{
           mainTitle.html($('.main .path li:last').html());
        }

    }


    //----Func box function

    function funcBox_show(name) {
        //remove all func-box show
        $('.func-box').removeClass('show');
        //func-box show
        $('.func-box[data-name = ' + name + ']').addClass('show');
    }


})();
