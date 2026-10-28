<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $score = $_POST['score'] ?? 0;

    $gameData = array(
    'player' => $player,
    'score' => $score,
    );

    $filePath = 'scores.json';

    if (file_exists($filePath)) {
        $dataArray = json_decode(file_get_contents($filePath), true);
    } else {
        $dataArray = [];
    }

    $dataArray[] = $gameData;

    file_put_contents(
        $filePath,
        json_encode($dataArray, JSON_PRETTY_PRINT)
    );

    echo "Score opgeslagen!";
}
?>