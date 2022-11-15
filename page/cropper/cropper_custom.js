let image = document.getElementById('image');
let cropBoxData, canvasData, cropper;
let $bannerModal = $('#bannerModal');
let $bannerUpload = $('.bannerUpload');

$bannerUpload.change(function (evt) {
    let tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('image').src = fr.result;
        }
        fr.readAsDataURL(files[0]);
        $bannerModal.modal({backdrop: 'static', keyboard: false});
    } else {
        $(this).val('');
    }
});


$bannerModal.on('shown.bs.modal', function () {
    cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        viewMode: 3,
        ready: function () {
            //Should set crop box data first here
            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        }
    });

    $('#btnCrop').click(function () {
        // Get a string base 64 data url
        let croppedImageDataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg')
        $('.module_box_banner').find("img").attr({"src":croppedImageDataURL,"data-change":"true"});
        cropper.destroy();
        $bannerModal.modal('toggle');
        banner_change_check = true;
    });

}).on('hidden.bs.modal', function () {
    cropBoxData = cropper.getCropBoxData();
    canvasData = cropper.getCanvasData();
    cropper.destroy();
    $bannerUpload.val('');
});

//base64 to file
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}