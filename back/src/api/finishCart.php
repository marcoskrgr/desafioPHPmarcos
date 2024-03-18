<?php 

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

include_once '../index.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    function subtractAmount(PDO $myPDO, $lastCode) {
        $query_cart = $myPDO->query("SELECT p.AMOUNT as p_amount, c.AMOUNT as c_amount, c.PRODUCT_NAME FROM CART as c, PRODUCTS as p, ORDERS as o WHERE c.product_name = p.product_name AND o.code = $lastCode");
        $res = $query_cart->fetchAll(PDO::FETCH_ASSOC);
        

        foreach($res as $r){
            $product_name = $r['product_name'];
            $amountProduct = $r['p_amount'];
            $amountCart = $r['c_amount'];
            $newAmount = $amountProduct - $amountCart;

            $query_update = $myPDO->query("UPDATE PRODUCTS SET AMOUNT = $newAmount WHERE PRODUCT_NAME = '$product_name'");
            $query_update->execute();
        }
    }


    $stmt = $myPDO->query("INSERT INTO ORDERS(TOTAL, TAX) SELECT SUM(c.total), SUM(c.price_tax) FROM CART as c");

    $query = $myPDO->query("SELECT code FROM ORDERS ORDER BY code DESC
    LIMIT 1");
    $res = $query->fetch(PDO::FETCH_ASSOC);  
    if(!empty($res)) {
        $lastCode = $res['code'];
    } 

    if(isset($lastCode) !== true) {
        $addToOrderItem = $myPDO->prepare("INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX)
        SELECT DISTINCT o.CODE, p.CODE, c.AMOUNT, c.price, c.tax
        FROM ORDERS AS o, CART AS c, PRODUCTS as p
        WHERE o.code = 1 AND p.product_name = c.product_name");
        $addToOrderItem->execute();
        subtractAmount($myPDO, 1);
    } else {
        $addToOrderItem = $myPDO->prepare("INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX)
        SELECT DISTINCT o.CODE, p.CODE, c.AMOUNT, c.price, c.tax
        FROM ORDERS AS o, CART AS c, PRODUCTS as p
        WHERE o.code = $lastCode AND p.product_name = c.product_name");
        $addToOrderItem->execute();
        subtractAmount($myPDO, $lastCode);
    }
}
