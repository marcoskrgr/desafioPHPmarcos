<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

include_once '../index.php';

$stmt = $myPDO->query('SELECT * FROM ORDERS');
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$history = json_encode($data);
echo $history; 