<?php
    include("config.php");
    $searchValue = $_REQUEST['searchValue'];
    $searchValue = str_replace(" ", "%20", trim($searchValue));
    $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=$searchValue&api_key=$API_KEY&format=json");
    $contentDecoded = json_decode($content, TRUE);
    $output = [];
    if($contentDecoded["results"]["opensearch:totalResults"] != "0"){
        foreach ($contentDecoded["results"]["artistmatches"]["artist"] as $key => $val) {
            foreach ($val as $key2 => $val2) {
                if ($key2 == 'image') {
                    continue;
                } else $output[$key][$key2] = $val2;
            }
        }
    }
    echo json_encode($output);
