<?php
    include("config.php");
    $userName = $_REQUEST["userName"];
    if($userName) {
        $userName = str_replace(" ", "%20", trim($userName));
        $period = $_REQUEST["period"];
        $output = [];
        if($period == 1) {
            $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=$API_KEY&user=$userName&limit=50&format=json");
            $contentDecoded = json_decode($content, TRUE);
            //get only one large image
            if (!$contentDecoded['error']) {
                if($contentDecoded['artists']['artist']) {
                    foreach ($contentDecoded['artists']['artist'] as $key => $val) {
                        foreach ($val as $key2 => $val2) {
                            if ($key2 == 'image') {
                                continue;
                            } else $output[$key][$key2] = $val2;
                        }
                    }
                }
            }
        } else{
            $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=$userName&api_key=$API_KEY&format=json");
            $contentDecoded = json_decode($content, TRUE);

            if (!$contentDecoded['error']) {
                if($contentDecoded["weeklyartistchart"]["artist"]){
                    $output = $contentDecoded["weeklyartistchart"]["artist"];
                }
            }
        }

        echo json_encode($output);
    }