
// Create a scanner for scanning the QR Code

// 1) video: document.getElementbyId('preview') --> The HTML element to use for the camera's video preview. Must be a <video> element.
// 2) continuous: true --> whether to continously scan for QR. Default is true
// 3) scanPeriod: 1 --> Only applies to continuous mode. The period, in rendered frames, between scans. A lower scan period
// increases CPU usage but makes scan response faster. Default 1 (i.e. analyze every frame).
// 4) mirror: true --> Whether to horizontally mirror the video preview. This is helpful when trying to
// scan a QR code with a user-facing camera. Default true.

let opts = { video: document.getElementById('preview'), scanPeriod: 1, mirror: true, backgroundScan: false, };
var scanner = new Instascan.Scanner(opts);
let copyBtn = document.getElementById('copy-btn');

scanner.addListener('scan', function (content) {
    document.querySelector('textarea').innerText = content;
});

copyBtn.addEventListener('click',() => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

Instascan.Camera.getCameras().then(function (cameras) {
    // Enumerate available video devices. Returns promise.
    // .then(function (cameras) { ... })
    // Called when cameras are available.
    // cameras: Array of Instascan.Camera instances available for use.

    if (cameras.length > 0) {
        scanner.start(cameras[0]);
        $('[name="options"]').on('change', function () {
            if ($(this).val() == 1) {
                if (cameras[0] != "") {
                    scanner.start(cameras[0]);
                } else {
                    alert('No Front camera found!');
                }
            } else if ($(this).val() == 2) {
                if (cameras[1] != "") {
                    scanner.start(cameras[1]);
                } else {
                    alert('No Back camera found!');
                }
            }
        });
    } else {
        console.error('No cameras found.');
        alert('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
    alert(e);
});