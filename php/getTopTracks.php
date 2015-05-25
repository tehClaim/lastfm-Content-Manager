<?php
try {
    include("config.php");
    $artistName = $_REQUEST["artistName"];
    if($artistName){
        $artistName = str_replace(" ", "%20", trim($artistName));
        $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=$artistName&api_key=$API_KEY&format=json");
        $contentDecoded = json_decode($content, TRUE);
        $output = array_slice($contentDecoded['toptracks']['track'], 0, 30 );
        echo json_encode($output);
    }
} catch	(Exception	$e)	{ echo json_encode(array('success'	=>	false)); }
if($conn) $conn->close();