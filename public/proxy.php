<?php
header('Content-Type: text/xml');
header('Access-Control-Allow-Origin: *');
$feed_url = 'https://export.maxposter.ru/dealer-export/1983-38233.xml';
$xml = file_get_contents($feed_url);
echo $xml;
?>
