<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

include_once '../index.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fullData = file_get_contents('php://input');
    $data = json_decode($fullData);
    $category = $data->category;
    $tax = $data->tax;

    $stmt = $myPDO->prepare("INSERT INTO CATEGORIES (code, category_name, tax) VALUES (DEFAULT, :category, :tax)");
    $stmt->bindParam(':category', $category, PDO::PARAM_STR);
    $stmt->bindParam(':tax', $tax, PDO::PARAM_INT);
    $stmt->execute();

    $return = json_encode($data);
    echo $return;
}