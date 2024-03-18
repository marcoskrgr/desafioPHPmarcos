<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

include_once '../index.php';

$stmt = $myPDO->query('SELECT p.code, p.product_name, p.amount, p.price, c.category_name FROM PRODUCTS as p, CATEGORIES as c WHERE p.category_code = c.code');
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$productList = json_encode($data);
echo $productList; 