<?php
try {
    include("config.php");
    include("connect.php");
    $userName = $_REQUEST["userName"];
    $mbid = $_REQUEST["mbid"];

    $stmt = $conn->prepare("
        SELECT
            w.id
        FROM Wishlist w
        INNER JOIN Artists a
        on w.artist = a.id
        INNER JOIN Users u
        on w.user = u.id
        where u.name = ? AND a.mbid = ?
    ");
    $stmt->bind_param("ss", $userName, $mbid);

    $stmt->execute();
    $row = bind_result_array($stmt);

    if (!$stmt->error) {
        while ($stmt->fetch())
            $output[] = getCopy($row);
    }
    echo json_encode($output);
} catch(Exception $e){
    echo json_encode(array('success'=>false, 'error'=>$e->getMessage()));
} if($conn) $conn->close();