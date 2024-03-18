<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

include_once '../index.php';

$stmt = $myPDO->query('SELECT o.code, o.order_code, p.product_name, o.amount, p.price, c.tax FROM ORDER_ITEM as o, PRODUCTS as p, CART as c WHERE p.code = o.product_code');
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
$history = json_encode($data);
echo $history; 