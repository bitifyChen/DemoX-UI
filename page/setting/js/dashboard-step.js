//DOM
const stepMenuItems = document.querySelectorAll(".stepMenu li");
const stepBoxs = document.querySelectorAll(".step-box");
const prevBtns = document.querySelectorAll(".prevBtn");
const nextBtns = document.querySelectorAll(".nextBtn");
//SET
//(true:編輯模式，false:新增模式)
let modeEdit = false;
let stepNum = stepMenuItems.length;

//now. Step
function nowStep() {
    let nowBoxStep = document.querySelector('.step-box.show').dataset.step;
    let nowMenuStep = document.querySelector('.stepMenu li.active').dataset.step;
    //check step same
    if (nowBoxStep === nowMenuStep) {
        return parseInt(nowMenuStep)
    } else {
        console.log('STEP error')
    }
}

//prev. step
prevBtns.forEach((e) => e.addEventListener("click", () => prevStep()));

function prevStep() {
    let stepNow = nowStep();
    if (stepNow === 1) {
        console.log("STEP TOP");
    } else if (stepNow <= stepNum) {
        stepBoxShow(stepNow - 1);
    }
}

//next. step
nextBtns.forEach((e) => e.addEventListener("click", () => nextStep()));

function nextStep() {
    let stepNow = nowStep();
    if (stepNow === stepNum) {
        console.log("STEP FINAL");
    } else if (stepNow < stepNum) {
        stepBoxShow(stepNow + 1);
    }
}

//click. step
stepMenuItems.forEach((stepItem) =>
    stepItem.addEventListener("click", () => {
        stepBoxShow(stepItem.dataset.step);
    })
);

//Finish Check
function finishCheck() {
    let check = document.querySelectorAll("[required]");
    let checkPass = 0;
    let unPassStep = [];
    //remove .alart
    stepMenuItems.forEach((e) => {
        e.classList.remove('alert')
    });

    check.forEach((e) => {
        //remove .alart if it was
        e.classList.remove("alert");
        if (e.value !== "" && e.type === 'text') {
            checkPass += 1;
        } else if (e.value != "" && e.tagName == "TEXTAREA") { 
            checkPass += 1;
        } else if (e.type === 'file') {
            let banner = document.querySelector(".module_box_banner img").getAttribute('src');
            ;
            if (banner !== "") {
                checkPass += 1;
            } else {
                //This Input Add Class .alert
                e.classList.add("alert");
                //Add This Step To unPass Array
                unPassStep.push(e.closest(".step-box").dataset.step);
            }
        }
        else {
            //This Input Add Class .alert
            e.classList.add("alert");
            //Add This Step To unPass Array
            unPassStep.push(e.closest(".step-box").dataset.step);
        }
    });

    if (checkPass == check.length) {
        return true
    } else {
        //All Unpass Step .alert
        unPassStep.forEach((step) => {
            let thisStepMenu = document.querySelector('.stepMenu li[data-step="' + step + '"]');
            thisStepMenu.classList.add('alert')
        });
        //Go First Unpass Step
        stepBoxShow(unPassStep[0]);
    }
}


function stepBoxShow(step) {
    //check box and menu is exist
    let thisStepBox = document.querySelector('.step-box[data-step="' + step + '"]');
    let thisStepMenu = document.querySelector('.stepMenu li[data-step="' + step + '"]');
    //check box and menu is same
    if (thisStepBox && thisStepMenu) {
        //remove all step-box show
        stepBoxs.forEach((e) => e.classList.remove("show"));
        //remove all step-Menu active
        stepMenuItems.forEach((e) => e.classList.remove("active"));
        //step-box show
        thisStepBox.classList.add("show");
        //step-Menu active
        thisStepMenu.classList.add("active");
    }
}
