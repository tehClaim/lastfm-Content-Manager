<?php
try {
    include("config.php");
    include("connect.php");
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $data['userId'] = $_REQUEST['userId'];
            $stmt = $conn->prepare("
                SELECT id as artistId
                FROM Artists
                WHERE mbid =  ?
            ");
            $stmt->bind_param("s", $data['mbid']);
            $stmt->execute();
            $stmt->bind_result($data['artistId']);
            $stmt->fetch();
            $stmt->close();

            if (!$data['artistId']) {
                $stmt = $conn->prepare("
                    INSERT INTO Artists (name, tag, image, mbid)
                    values (?, ?, ?, ?)
                ");
                $stmt->bind_param("ssss", $data['name'], $data['tag0'], $data['imageSmall'], $data['mbid']);
                $stmt->execute();
                $data['artistId'] = $stmt->insert_id;
                $stmt->close();
            }

            $data['currentDate'] = date("Y-m-d");
            $stmt = $conn->prepare("
                INSERT INTO Wishlist (artist, user, added)
                values (?, ?, ?)
            ");
            $stmt->bind_param("iis", $data['artistId'], $data['userId'], $data['currentDate']);
            $stmt->execute();
            $data['id'] = $stmt->insert_id;
            $stmt->close();
            $output['id'] = $data['id'];
            $output['added'] = $data['currentDate'];
            echo json_encode($output);
            break;
        case 'PUT':
            break;
        case 'GET':
            $userId = $_REQUEST['userId'];
            $output = [];
            $stmt = $conn->prepare("
                SELECT
                    w.id,
                    w.added,
                    a.name,
                    a.mbid,
                    a.image as imageSmall,
                    a.tag as tag0
                FROM Wishlist AS w
                INNER JOIN Artists AS a
                ON w.artist = a.id
                WHERE w.user = ?
            ");
            $stmt->bind_param("s", $userId);
            $stmt->execute();
            $row = bind_result_array($stmt);

            if(!$stmt->error)
            {
                while($stmt->fetch())
                    $output[] = getCopy($row);
            }
            echo json_encode($output);

            break;
        case 'DELETE':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $conn->prepare("
                DELETE FROM Wishlist
                WHERE id = ?
            ");
            $stmt->bind_param("i", $data['id']);
            $stmt->execute();
            echo json_encode(array('success'	=>	true));
            break;
    }
} catch	(Exception	$e)	{ echo json_encode(array('success'	=>	false)); }
if($conn) $conn->close();