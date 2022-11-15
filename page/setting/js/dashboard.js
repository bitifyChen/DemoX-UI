
//起始函式
(function() {
    //DOM
    const sideBar = $('.sideBar')
    const buttonAppMenu = $('button.app-menu');
    const main = $('.main');


    //--【mode SET】
    const mode = $.cookie('colorMode');
    if (mode === 'dark') {
        $('html').addClass('dark');
    } else {
        $('html').removeClass('dark');
    }


    //--RWD Menu Button

    buttonAppMenu.click(function() {
        sideBar.toggleClass('show');
        main.toggleClass('hide');
    });


    //--RWD Menu 100vh

    function rwd100vh() {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    //--起始程式
    rwd100vh();
    //--如果螢幕大小更改
    let org_width = $(window).width();
    let org_heigth = $(window).height();
    $(window).resize(function() {
        if ($(window).width() != org_width || $(window).height() != org_heigth) {
            rwd100vh();
            org_width = $(window).width();
            org_heigth = $(window).height();
        }
    });


    //--Animation
    const btnClose = $('#btn-close-dashboard');
    btnClose.click(function() {
        $('.wrap-animation').addClass('closePage');
        document.querySelector('.wrap-animation').addEventListener('animationend', () => {
            location.href = window.location.origin;
        });
    })

})();