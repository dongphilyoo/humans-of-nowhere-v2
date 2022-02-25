<?php
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Humans for Nowhere Gallery</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

        *,
        html,
        body {
            margin: 0;
            padding: 0;
            font-size: 16px;
        }

        body {
            background-color: #15171A;
        }

        h1 {
            /* font-family: 'Dancing Script', cursive; */
            font-family: 'Lora', serif;
            font-weight: normal;
            font-size: 3rem;
            font-weight: 400;
            color: white;
            margin: 6rem;
        }

        h1 span:nth-child(1) {
            font-family: 'Dancing Script', cursive;
            font-size: 3rem;
        }
        h1 span:nth-child(2) {
            font-size: 1.8rem;
            margin: 0 1rem;
        }
        
        #gallery {
            width: 80vw;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 4rem;
            margin: 0 auto;
            margin-bottom: 4rem;
        }

        div.item-wrap {
            padding: 2rem;
            background-color: #eeedee;
            font-family: 'Lora', serif;
        }

        img.item-image {
            float: left;
            margin: 0 2rem 1rem 0;
        }

        img.flipped {
            -webkit-transform: scaleX(-1);
            -moz-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            transform: scaleX(-1);
        }

        /* Medium devices (landscape tablets, 768px and up) */
        @media only screen and (max-width: 768px) {
            h1 {
                font-size: 2rem;
                text-align: center;
                margin: 3rem;
            }

            h1 span:nth-child(1) {
                font-size: 2.4rem;}

            h1 span:nth-child(2) {
                font-size: 1.4rem;
                margin: 0 0.5rem;
            }

            #gallery {
                width: 90%;
                display: block;
                grid-template-columns: none;
                grid-gap: 0;
            }

            div.item-wrap {
                margin-bottom: 4rem;
            }            
        }
    </style>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"></script>
</head>
<body>
    <h1><span>Gallery</span><span>for</span>HUMANS OF NOWHERE</h1>
    <div id="gallery"><?php
        require "./scripts/server/get.php";
        foreach (array_reverse($items) as $i) { ?>
        <div class="item-wrap lozad" data-id="<?=$i["id"]?>">
            <img class="item-image <?=$i["class"]?>" src="<?=$i["image"]?>" />
            <div class="item-text"><?=$i["text"]?></div>
        </div>
        <?php }
    ?></div>
    <script>
        const observer = lozad();
        observer.observe();
    </script>
</body>
</html>