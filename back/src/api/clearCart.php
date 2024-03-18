<?php 

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

include_once '../index.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stmt = $myPDO->query("DELETE FROM CART");
}