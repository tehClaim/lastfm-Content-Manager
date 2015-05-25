<?php
try {
    include("config.php");
    $artistName = $_REQUEST["artistName"];
    if($artistName){
        $artistName = str_replace(" ", "%20", trim($artistName));
        $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=$artistName&limit=20&api_key=$API_KEY&format=json");
        $contentDecoded = json_decode($content, TRUE);
        $output = [];
        if(!$contentDecoded['error']){
            if($contentDecoded['similarartists']['artist'][0]){
                foreach ($contentDecoded['similarartists']['artist'] as $key => $val) {
                    foreach ($val as $key2 => $val2) {
                        if ($key2 == 'image') {
                            foreach ($val2 as $key3 => $val3) {
                                if ($val3['size'] == 'large') $output[$key]['imageSmall'] = $val3['#text'];
                                if ($val3['size'] == 'medium') $output[$key]['imageVerySmall'] = $val3['#text'];
                            }
                        } else $output[$key][$key2] = $val2;
                    }
                }
            } else{
                foreach($contentDecoded['similarartists']['artist'] as $key => $val){
                    if($key == 'image'){
                        foreach($val as $keyImage => $valImage){
                            if ($valImage['size'] == 'large') $output['imageSmall'] = $valImage['#text'];
                            if ($valImage['size'] == 'medium') $output['imageVerySmall'] = $valImage['#text'];
                        }
                    } else $output[$key] = $val;
                }
            }
        }
        echo json_encode($output);
    }
} catch	(Exception	$e)	{ echo json_encode(array('success'	=>	false)); }
if($conn) $conn->close();