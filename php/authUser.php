<?php
try {
    include("config.php");
    include("connect.php");
    $userName = $_REQUEST["userName"];
    $currentDate = date("Y-m-d");
    $userName = str_replace(" ", "%20", trim($userName));
    $userName = strtolower($userName);
    $content = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=$userName&api_key=$API_KEY&format=json");
    $contentDecoded = json_decode($content, TRUE);
    if(!$contentDecoded['error']){
        //search for id in local db
        $stmt = $conn->prepare("
            SELECT
                id as userId
            FROM Users
            WHERE name = ?
        ");
        $stmt->bind_param("s", $userName);
        $stmt->execute();
        $stmt->bind_result($userId);
        $stmt->fetch();
        $stmt->close();
        if(!$userId){
            $stmt = $conn->prepare("
                INSERT INTO Users (id, name, login)
                values (?, ?, ?)
            ");
            $stmt->bind_param("iss", $contentDecoded['user']['id'], $userName, $currentDate);
            $stmt->execute();
            $userId = $contentDecoded['user']['id'];
            $stmt->close();
        } else{
            $stmt = $conn->prepare("
                UPDATE Users
                SET login = ?
                WHERE id = ?
            ");
            $stmt->bind_param("si", $currentDate, $userId);
            $stmt->execute();
            $stmt->close();
        }

        foreach ($contentDecoded['user'] as $key => $val) {
            switch($key) {
                case 'image':
                    foreach ($val as $keyImage => $valImage) {
                        if ($valImage['size'] == 'small') $output['imageSmall'] = $valImage['#text'];
                    }
                    break;
                default:
                    $output[$key] = $val;
            }
        }
        echo json_encode($output);
    } else throw new Exception($contentDecoded['error']);
} catch(Exception $e){
    echo json_encode(array('success'=>false, 'error'=> $e->getMessage()));
} if($conn) $conn->close();