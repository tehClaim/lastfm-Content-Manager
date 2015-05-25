<?php
try {
    include("config.php");
    $artistName = $_REQUEST["artistName"];
    if($artistName){
        $artistName = str_replace(" ", "%20", trim($artistName));
        $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=$artistName&api_key=$API_KEY&limit=20&format=json");
        $contentDecoded = json_decode($content, TRUE);
        $output;
        //check for multiple records
        if($contentDecoded['topalbums']['album'][0]){
            foreach ($contentDecoded['topalbums']['album'] as $key => $val) {
                foreach ($val as $key2 => $val2) {
                    if ($key2 == 'image') {
                        foreach ($val2 as $key3 => $val3) {
                            if ($val3['size'] == 'medium') $output[$key]['image'] = $val3['#text'];
                        }
                    } else $output[$key][$key2] = $val2;
                }
            }
        } else{
            $output['name'] = $contentDecoded['topalbums']['album']['name'];
            $output['playcount'] = $contentDecoded['topalbums']['album']['playcount'];
            foreach ($contentDecoded['topalbums']['album']['image'] as $key => $val) {
                if ($val['size'] == 'medium') $output['image'] = $val['#text'];
            }

        }
        echo json_encode($output);
    }
} catch	(Exception	$e)	{ echo json_encode(array('success'	=>	false)); }
if($conn) $conn->close();