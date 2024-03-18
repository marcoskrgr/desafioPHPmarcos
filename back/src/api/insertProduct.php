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
    $product = $data->product;
    $amount = $data->amount;
    $price = $data->price;
    $category = $data->category;

    $stmt = $myPDO->query("SELECT code FROM CATEGORIES WHERE category_name = '$category'");
    $res = $stmt->fetch(PDO::FETCH_DEFAULT);
    $categoryCode = $res['code'];


    $stmt = $myPDO->prepare("INSERT INTO PRODUCTS (code, product_name, amount, price, category_code) 
    VALUES(DEFAULT, :product_name, :amount, :price, :category_code)");

    $stmt->bindParam(':product_name', $product, PDO::PARAM_STR);
    $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
    $stmt->bindParam(':price', $price, PDO::PARAM_INT);
    $stmt->bindParam(':category_code', $categoryCode, PDO::PARAM_INT);
    $stmt->execute();

    $return = json_encode($data);
    echo $return;
}
