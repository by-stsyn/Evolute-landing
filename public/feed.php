<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/xml');

$url = 'https://export.maxposter.ru/dealer-export/1983-38233.xml';

// Try to use file_get_contents
$xml = @file_get_contents($url);

if ($xml !== false) {
    echo $xml;
} else {
    // Fallback to cURL if file_get_contents is disabled
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $output = curl_exec($ch);
    curl_close($ch);
    echo $output;
}
?>
