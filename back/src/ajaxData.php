<?php 
include_once './index.php';



$id = $_GET['code'];

if(!empty($id)){
    $query = "SELECT products.price, categories.tax FROM PRODUCTS, CATEGORIES WHERE products.code = $id AND products.category_code = categories.code";
    $result = $myPDO->prepare($query);
    $result->execute();

    if($result){
        $data = $result->fetch(PDO::FETCH_ASSOC);
        echo json_encode($data);   
    }
}
?>
