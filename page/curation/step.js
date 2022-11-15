var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        $("#nextBtn").attr('onClick', 'api_curation_add(this);');
        document.getElementById("nextBtn").innerHTML = "送出";
    } else {
        document.getElementById("nextBtn").innerHTML = "下一步";
        $("#nextBtn").attr('onClick', 'nextPrev(1);');
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

//資料是否齊全驗證
function validateForm() {
    let valid = true;
    let x = document.getElementsByClassName("tab");
    //標題
    let curation_title = $("input.curation_input[name='name']");
    //Banner
    let curation_banner = $('.module_box_banner').find("img").attr('src');
    //判斷有無標題
    if (currentTab === 0 && curation_title.val() == "") {
        check_data_error('未填寫策展標題')
        curation_title.addClass('invalid');
        valid = false;
    }
    //判斷有無banner
    else if (currentTab === 1 && curation_banner == "") {
        check_data_error('未上傳策展封面圖片')
        valid = false;
    } else {
        $('.content-box .invalid').removeClass('invalid');
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

function goTab(page) {
    $('.tab').hide();
    showTab(page);
}

function check_data_error(meg) {
    new Noty({type: 'error', text: meg, timeout: 2000,}).show();
}