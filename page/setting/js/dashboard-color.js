//起始函式
(function() {
    //DOM
    const buttonMode = $('button.mode');
    //--Dashboard Color Mode
    //---Dak Light Switch
    buttonMode.click(function() {
        const mode = $('html').hasClass('dark');
        if (mode) {
            //新增Cookie
            document.cookie="colorMode=light;path=/"
        } else {
            //新增Cookie
            document.cookie="colorMode=dark;path=/"
        }
        //轉換顏色
        $('html').toggleClass('dark');
    });
})();