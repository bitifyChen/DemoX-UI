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
