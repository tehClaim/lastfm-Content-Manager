<?php
    include("config.php");
    $artist = $_REQUEST['artist'];
    $tagName = $_REQUEST['tagName'];
    if($artist){
        $artist = str_replace(" ", "%20", trim($artist));
        $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=$artist&api_key=$API_KEY&format=json");
        $contentDecoded = json_decode($content, TRUE);
        $output = array_slice($contentDecoded["toptags"]["tag"], 0, 6 );
        echo json_encode($output);
    } else{
        $tagName = str_replace(" ", "%20", trim($tagName));
        $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=$tagName&api_key=$API_KEY&format=json");
        $contentDecoded = json_decode($content, TRUE);
        $output["name"] = $tagName;
        $output["description"] = $contentDecoded["tag"]["wiki"]["content"];
        echo json_encode($output);
    }