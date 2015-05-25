<?php
    include("config.php");
    $artist = $_REQUEST["artist"];
    if($artist){
        $artist = str_replace(" ", "%20", $artist);
        $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=$artist&api_key=$API_KEY&format=json");
        $contentDecoded = json_decode($content, TRUE);
        foreach ($contentDecoded['artist'] as $key => $val) {
            switch($key){
                case 'image':
                    foreach ($val as $keyImage => $valImage) {
                        if ($valImage['size'] == 'extralarge') $output['image'] = $valImage['#text'];
                        if ($valImage['size'] == 'large') $output['imageSmall'] = $valImage['#text'];
                    }
                    break;
                case 'bio':
                    $output[$key] = $val['content'];
                    break;
                case 'tags':
                    foreach ($val['tag'] as $keyTag => $valTag){
                        //$tagName = "tag$keyTag";
                        $output["tag$keyTag"] = $valTag['name'];
                    }
                    break;
                case 'stats':
                    $output['listeners'] = $val['listeners'];
                    $output['totalPlaycount'] = $val['playcount'];
                    break;
                default:
                    $output[$key] = $val;
            }
            /*if ($key == 'image') {
                    foreach ($val as $keyImage => $valImage) {
                        if ($valImage['size'] == 'extralarge') $output['image'] = $valImage['#text'];
                    }
                } else if($key == 'bio'){
                    foreach ($val as $keyBio => $valBio) {
                        if ($valImage['size'] == 'extralarge') $output['image'] = $valImage['#text'];
                    }
                } else $output[$key] = $val;*/
        }
        //$output = json_decode($content, TRUE);
        echo json_encode($output);
    }