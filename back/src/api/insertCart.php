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
    $productCode = $data->product;

    $stmt = $myPDO->query("SELECT product_name FROM PRODUCTS WHERE code = $productCode");
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    $product = $res['product_name'];

    $amount = $data->amount;
    $price = $data->price;
    $tax = $data->tax;
    $calcTax = $amount * $price;
    $priceTax = ($tax / 100) * $calcTax;
    $total = $priceTax + $calcTax;

    $stmt = $myPDO->prepare("INSERT INTO CART (code, product_name, amount, price, tax, price_tax, total) 
    VALUES(DEFAULT, :product_name, :amount, :price, :tax, :price_tax, :total)");

    $stmt->bindParam(':product_name', $product, PDO::PARAM_STR);
    $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
    $stmt->bindParam(':price', $price, PDO::PARAM_INT);
    $stmt->bindParam(':tax', $tax, PDO::PARAM_INT);
    $stmt->bindParam(':price_tax', $priceTax, PDO::PARAM_INT);
    $stmt->bindParam(':total', $total, PDO::PARAM_INT);
    $stmt->execute();

    $return = json_encode($data);
    echo $return;
}
