if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)) {

    // alert("You're using Mobile Device!!");
    document.getElementById("video").classList.add("hidden");
    document.getElementById("capture").classList.add("hidden");
    document.querySelector(".webcam-ui-wrap").classList.add("hidden");
} else {
    // alert('desktop user');
}

let canvas = $("#canvas");
let context = canvas.get(0).getContext("2d");
let $result = $('#result');

let inputCanvas = $("#input-canvas");
let inputCtx = inputCanvas.get(0).getContext("2d");

$('#go-to-demo').on('click', function () {
    // Scroll to a certain element
    document.querySelector('#user-input-section').scrollIntoView({
        behavior: 'smooth'
    });
});

$('#fileInput').on('click', function () {
    this.value = null;
});

$('#fileInput').on('change', function () {
    canvas.cropper('destroy');
    $result.empty();
    webcam_toggle.checked = false;
    cameraoff();

    if (this.files && this.files[0] && this.files[0].type.match(/^image\//)) {
        // console.log(this.files);
        var reader = new FileReader();
        reader.onload = function (evt) {
            var img = new Image();
            img.onload = function () {
                context.canvas.height = img.height;
                context.canvas.width = img.width;
                context.drawImage(img, 0, 0);
                var cropper = canvas.cropper({
                    aspectRatio: 1 / 1,
                    center: false,
                    dragMode: 'move',
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    autoCropArea: 0.85,
                });
                $('#btnCrop').click(function () {
                    webcam_toggle.checked = false;
                    cameraoff();
                    // Get a string base 64 data url
                    var croppedImageDataURL = canvas.cropper(
                            'getCroppedCanvas')
                        .toDataURL("image/png");
                    $result.empty();
                    $result.append($('<img id="input-cropped">').attr('src',
                        croppedImageDataURL));
                });

                // $('#btnRestore').click(function () {
                //     canvas.cropper('reset');
                //     $result.empty();
                // });

                $('#not-use-capture').click(function () {
                    canvas.cropper('reset');
                    $result.empty();
                });
            };
            img.src = evt.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    } else {
        alert("Invalid file. Please select an image file.");
    }
});

let video = document.getElementById("video");

let input_canvas = document.getElementById("input-canvas");
let output_canvas = document.getElementById("output-canvas");

let input_ctx = input_canvas.getContext('2d');
let output_ctx = output_canvas.getContext('2d');

let capture_button = document.getElementById("capture");
// let toggle_button = document.getElementById("toggle");
let webcam_toggle = document.getElementById("toggleBtn");
let isPlaying = !!video.srcObject;

let use_capture = document.getElementById("use-capture");
let not_use_capture = document.getElementById("not-use-capture");

let transfer_button = document.getElementById("transfer-button");

// toggle_button.addEventListener('click', toggleCamera);
webcam_toggle.addEventListener('click', toggleCamera);


function setup() {
    pix2pix = ml5.pix2pix('model/nyc.pict', modelLoaded);
}

use_capture.addEventListener('click', function () {
    use_capture.classList.add("button--loading");

    if ($('#result').is(':empty')) {
        get_partseg().then((params) => {
            if (params.coloredPartImage != null) {
                bodyPix.drawMask(
                    output_canvas,
                    input_canvas,
                    params.coloredPartImage,
                    params.opacity,
                    params.maskBlurAmount,
                    params.flipHorizontal
                );
                document.getElementById('error-message').innerHTML = "";

                changeColor(output_canvas).then(transfer()).then(doTextGen());

                // transfer();
            } else {
                // let message = document.createElement("span");
                // message.innerHTML = "Take photo again";
                // document.getElementById('output').appendChild(message);
                let errMsg = document.getElementById('error-message');
                errMsg.innerHTML = "Take photo again.";
                errMsg.style.color = "red";

                input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
                output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);

                use_capture.classList.remove("button--loading");
            }
        });
    } else {
        // if cropped image is in the input area
        let img = document.getElementById('input-cropped');

        get_partseg(img).then((params) => {
            if (params.coloredPartImage != null) {
                bodyPix.drawMask(
                    output_canvas,
                    input_canvas,
                    params.coloredPartImage,
                    params.opacity,
                    params.maskBlurAmount,
                    params.flipHorizontal
                );
                document.getElementById('error-message').innerHTML = "";

                changeColor(output_canvas).then(transfer(false)).then(doTextGen());

            } else {
                // let message = document.createElement("span");
                // message.innerHTML = "Please try another image.";
                // document.getElementById('output').appendChild(message);
                let errMsg = document.getElementById('error-message');
                errMsg.innerHTML = "Try another image.";
                errMsg.style.color = "red";

                $('#result').empty();
                input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
                output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
                
                use_capture.classList.remove("button--loading");
            }
        });
    }
});

function doTextGen() {
    // pass input text
    let textVal = document.getElementById("textGenInput").value;
    // console.log(textVal);
    if (textVal.length != 0) {
        getText(textVal);
    } else {
        getText();
    }
    use_capture.classList.remove("button--loading");
}

not_use_capture.addEventListener('click', function () {
    input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
    output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
    $('#result').empty();
});

// transfer_button.addEventListener('click', () => {
//     // let pix2pix = ml5.pix2pix('model/nyc.pict', modelLoaded);
//     // console.log(pix2pix);
//     transfer();
// });

let imgSrc;
let generatedText;
let isFlip = "";

async function transfer(is_flip = true) {
    // Update status message
    // statusMsg.html('Transfering...');

    // Select canvas DOM element
    const canvasElement = select('#output-canvas').elt;

    // Apply pix2pix transformation
    pix2pix.transfer(canvasElement, function (err, result) {
        if (err) {
            console.log(canvasElement);
            console.log(err);
        }
        if (result && result.src) {
            // statusMsg.html('Done!');
            // Create an image based result
            // output.elt.src = result.src;
            // console.log(result);

            let img = document.getElementById("output-image");
            // let img = document.createElement("img");
            img.src = result.src;

            imgSrc = result.src; // golbal variable
            // img.style.minWidth = "256px";
            // img.style.minHeight = "256px";
            if (is_flip) {
                img.style.transform = "scaleX(-1)";
                isFlip = "flipped";
            } else {
                isFlip = "";
            }
            // document.getElementById('output').appendChild(img);

            // parseDataToPHP(result.src, generatedText, isFlip);
        }
    });
}

async function parseDataToPHP(imgUrl, text, classFlip) {
    $.ajax({
        method: 'POST',
        url: './scripts/server/post.php',
        data: {
            image: imgUrl,
            text: text,
            class: classFlip,
        },
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, errorMessage) {
            console.log("RESPONSE: " + xhr.responseText + ", error: " + errorMessage);
        }
    });

    input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
    output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
}

function modelLoaded() {
    console.log('pix2pix model loaded');
}


function toggleCamera() {
    if (!isPlaying) {
        cameraon();
    } else {
        cameraoff();
    }
}

function cameraon() {
    input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
    output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);
    $('#result').empty();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: false
            })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .then(() => {
                document.getElementById("result").style.visibility = "hidden";
                isPlaying = true;
                // toggle_button.innerText = "Off";
                // webcam_toggle.checked = !webcam_toggle.checked;
            });
    }
}

function cameraoff() {
    const stream = video.srcObject;

    if (stream) {
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        input_ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
        output_ctx.clearRect(0, 0, output_canvas.width, output_canvas.height);

        document.getElementById("result").style.visibility = "visible";

        video.srcObject = null;
        isPlaying = false;
        // toggle_button.innerText = "On";
        // webcam_toggle.checked = !webcam_toggle.checked;
    }
}

capture_button.addEventListener('click', function () {
    // get the scale
    let scale = Math.min(input_canvas.width / video.videoWidth, input_canvas.height / video
        .videoHeight);
    // get the top left position of the image
    let x = (input_canvas.width / 2) - (video.videoWidth / 2) * scale;
    let y = (input_canvas.height / 2) - (video.videoHeight / 2) * scale;

    input_ctx.drawImage(video, -x, y, video.videoWidth * scale + (input_canvas.width *
            scale + (2 * x) +
            5),
        video.videoHeight * scale);
});


async function get_partseg(input = input_canvas) {
    const net = await bodyPix.load();
    const partSegmentation = await net.segmentMultiPersonParts(input);

    const coloredPartImage = bodyPix.toColoredPartMask(partSegmentation);
    const opacity = 1;
    const flipHorizontal = false;
    const maskBlurAmount = 0;

    const params = {
        coloredPartImage: coloredPartImage,
        opacity: opacity,
        flipHorizontal: flipHorizontal,
        maskBlurAmount: maskBlurAmount
    }

    return params;
}

async function changeColor(c) {
    var output_ctx = c.getContext('2d');
    var imgd = output_ctx.getImageData(0, 0, 256, 256);
    var pix = imgd.data;
    var n = pix.length;

    for (var i = 0; i < n; i += 4) {
        var r = pix[i];
        var g = pix[i + 1];
        var b = pix[i + 2];

        if (r == 255 && g == 255 && b == 255) {
            // Change the white to the new color.
            pix[i] = 0;
            pix[i + 1] = 0;
            pix[i + 2] = 0;
            pix[i + 3] = 255;
        }
    }
    output_ctx.putImageData(imgd, 0, 0);
}

// read text from URL location
function getText(input = "You are the most exquisite thing I have ever seen before.") {
    var request = new XMLHttpRequest();
    request.open('GET',
        'https://gist.githubusercontent.com/dongphilyoo/d175f52c9830f7b61bb3666fdf1a234a/raw/ad2f3c1466e1b8daa906af0a83598f3d498c1d67/corpus.txt',
        true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                let data = request.responseText;
                generateText(data, input);
            }
        }
    };
}

// // use_capture = document.getElementById("use-capture");
// use_capture.addEventListener('click', function () {
//     // pass input text
//     let textVal = document.getElementById("textGenInput").value;
//     console.log(textVal);
//     getText(textVal);
// });


function generateText(text, inputText) {
    let textByLine = text.split('.');
    textByLine = textByLine.map(sentence => sentence + ".");
    // console.log(textByLine);

    let result = stringSimilarity.findBestMatch(inputText, textByLine);
    let ratings = result.ratings;
    let matches = ratings.filter(item => item.rating > 0);

    let topMatches = matches.sort((a, b) => (b.rating - a.rating)).slice(0, 300);
    // console.log(topMatches.map(i => i.rating));

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }

    let shuffled = shuffle(topMatches).slice(0, 15);
    // console.log(shuffled);

    let output = "";
    output = shuffled.map(i => output + i.target);
    output = output.join('');

    // console.log(output);
    // let message = document.createElement("span");
    // message.innerHTML = output;
    // document.getElementById('output').appendChild(message);

    document.getElementById('output-text').innerHTML = output;

    $('.go-to-gallery, .done').addClass('hidden');
    document.getElementById("share").style.display = "inline-block";


    generatedText = output;


    // $.ajax({
    //     method: 'POST',
    //     url: './test.php',
    //     // dataType: 'json',
    //     data: {
    //         text: output
    //     },
    //     success: function (data) {
    //         console.log(data);
    //     },
    //     error: function (xhr, status, errorMessage) {
    //         console.log("RESPONSE: " + xhr.responseText + ", error: " + errorMessage);
    //     }
    // });
    // document.getElementById('share').addEventListener('click', function () {
    //     event.preventDefault();
    //     parseDataToPHP(imgSrc, generatedText, isFlip);
    // });

    $('#share').off("click").on('click', function () {
        parseDataToPHP(imgSrc, generatedText, isFlip).then(function(){
            document.getElementById("share").style.display = "none";
            $('.go-to-gallery, .done').removeClass('hidden');
        });
    });

}