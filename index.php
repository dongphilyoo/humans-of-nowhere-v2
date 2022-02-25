<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Humans of Nowhere</title>
    <link rel="stylesheet" href="style/cropper.css">
    <link rel="stylesheet" href="style/main.css">
    <!-- Add icon library -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
    <header>
        <div class="content-wrapper">
            <div class="intro">
                <div>
                    <h1>HUMANS OF NOWHERE</h1>
                    <p>Humans of Nowhere, a speculative AI living on the internet, generates imaginary portraits and their stories. The machine was trained to understand the desire for intimacy and connection that we humans have had during the period of isolation and incertitude. While you witness the ontological synthesis of our time, your silhouette will become a vessel of empathy, harmony, and coexistence.</p>
                    <p>This generative art project is powered by a conditional generative adversarial network(cGAN) model, <a href="https://arxiv.org/abs/1611.07004" target="_blank">Pix2Pix</a>. It learns a mapping from input images to output images, your silhouette to a synthesized image in this case. Over 7,000 portraits and personal stories of people in New York were collected from various sources and fed to train the AI. Please <a href="mailto:hi@dongphilyoo.com" target="_blank">email</a> if you have questions.</p>
                </div>
                <ul>
                    <li><a id="go-to-demo">How it works</a></li>
                    <?php $link = "./gallery.php";?>
                    <li><a href="<?= $link; ?>"  target="_blank">Gallery</a></li>
                </ul>
            </div>
            <img src="assets/poster.jpg" alt="">
        </div>
    </header>
    <section id="user-input-section">
        <div class="image-input-section">
            <h3>1. Take a photo or upload an image</h3>
            <div class="first-inner inner">
                <div class="webcam-area">
                    <div id="video-container">
                        <video id="video" autoplay></video>
                        <canvas id="output-canvas"></canvas>
                        <canvas id="input-canvas"></canvas>
                        <div id="result"></div>
                    </div>
                    <!-- <button id="toggle">On</button> -->
                    <button id="capture"><i class="fa fa-camera" style="font-size:20px"></i></button>
                </div>
                <div class="webcam-or-image">
                    <div class="aligned-vertical">
                        <div class="webcam-ui-wrap">
                            <span>Webcam</span>
                            <div class=webcam-toggle-wrap>
                                <label class="switch">
                                    <input type="checkbox" id="toggleBtn">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="fileInput-wrap">
                            <input type="file" id="fileInput" accept="image/*" this.value=null; />
                        </div>
                        <button id="not-use-capture"><i class="fa fa-undo" style="font-size:20px"></i></button>
                    </div>
                </div>
                <div class="image-area">
                    <!-- Below are a series of inputs which allow file selection and interaction with the cropper api -->
                    <!-- <input type="button" id="btnRestore" value="Restore" /> -->
                    <div id="cropper-wrapper">
                        <canvas id="canvas">
                            Your browser does not support the HTML5 canvas element.
                        </canvas>
                    </div>
                    <button id="btnCrop"><i class="fa fa-scissors" style="font-size:20px"></i></button>
                    <!-- <input type="button" id="btnCrop" value="Crop" /> -->
                </div>
            </div>
            <!-- <button id="transfer-button">Transfer</button> -->
        </div>

        <div class="text-input-section">
            <h3>2. Type something about you</h3>
            <div class="second-inner inner">
                <input id="textGenInput" type="text" name="user" placeholder=" This is my story..." maxlength="100">
            </div>
        </div>

        <div class="result-section">
            <h3>3. See the result</h3>
            <div id="error-message"></div>
            <div class="genBtn-wrap">
                <button id="use-capture"><span class="button__text">Generate</span></button>
            </div>
            <div id="output">
                <img src="" alt="" id="output-image">
                <div>
                    <p id="output-text"></p>
                    <span id="share"><u>Share to gallery</u></span><span class="done hidden">Done!</span><a class="go-to-gallery hidden" href="<?= $link; ?>"  target="_blank">Go to gallery</a>
                </div>
            </div>
        </div>
    </section>


    <!-- Load TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.7.4"></script>
    <!-- Load BodyPix -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.0"></script>
    <!-- Load jQuery & Cropper.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropper/2.3.3/cropper.js"></script>
    <script src="//unpkg.com/string-similarity/umd/string-similarity.min.js"></script>

    <!-- Load p5.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.dom.min.js"></script>
    <!-- Load ml5.js -->
    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>

    <!-- Load index.js -->
    <script src="scripts/index.js"></script>
</body>

</html>