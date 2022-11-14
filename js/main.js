window.addEventListener("scroll", function () {
  enterCheck(); //fade active
  // scrollBgc(); // background color change
});

// Navbar
const headerCheck = document.querySelector("#header-check");

// When the user scrolls down 20px from the top of the document, show the Navbar

let headerAutoClosed = false;

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (!headerAutoClosed) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      headerCheck.checked = false;
      headerAutoClosed = true;
    } else {
      headerCheck.checked = true;
    }
  }
}

// Footer
//Footer 進場動畫
//-Footer 下方區塊漸進
let footerController = new ScrollMagic.Controller();
new ScrollMagic.Scene({
  triggerElement: document.querySelector(".main-footer"),
  triggerHook: 0.8,
})
  .setTween(TweenMax.fromTo(document.querySelector(".main-footer .main-block"), 1, { scale: 0.8 }, { scale: 1 }))
  .addTo(footerController);
//-Footer 上方Bar動畫
new ScrollMagic.Scene({
  triggerElement: document.querySelector(".main-footer"),
  triggerHook: 1,
  duration: document.querySelector(".main-footer").offsetHeight,
})
  .setTween(TweenMax.fromTo(document.querySelector(".main-footer .footer-bar"), 1, { width: "0%" }, { width: "100%" }))
  .addTo(footerController);

// Item active
const onceItems = document.querySelectorAll(".fadeOnce");
const items = document.querySelectorAll(".fade");

function enterCheck() {
  const windowHigh = window.innerHeight;
  onceItems.forEach((item) => {
    const toTopHight = item.getBoundingClientRect().y;
    let fadeDelay = 0;
    if (toTopHight < windowHigh / 1.25) {
      if (item.getAttribute("data-fade-delay")) {
        fadeDelay = item.getAttribute("data-fade-delay");
      }
      setTimeout(function () {
        item.classList.add("active");
      }, fadeDelay);
    }
  });

  items.forEach((item) => {
    const toTopHight = item.getBoundingClientRect().y;
    let fadeDelay = 0;
    if (toTopHight < windowHigh / 1.25) {
      if (item.getAttribute("data-fade-delay")) {
        fadeDelay = item.getAttribute("data-fade-delay");
      }
      setTimeout(function () {
        item.classList.add("active");
      }, fadeDelay);
    } else {
      item.classList.remove("active");
    }
  });
}
enterCheck();

// Drag items (Need CSS)
document.addEventListener("DOMContentLoaded", () => {
  const ele = document.querySelector(".drag-scroll");
  if (ele) {
    ele.style.cursor = "grab";

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = "grab";
      ele.style.removeProperty("user-select");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener("mousedown", mouseDownHandler);
  }
});
