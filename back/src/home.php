<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="css/home.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
    <title>Home</title>
</head>

<body>
    <?php
    include_once './partials/header-nav.php';
    include_once './index.php';
    ?>

    <main>
        <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="GET" class="home">
            <select name="home-product" id="home-select-product">
                <option id="default" value="" disabled selected>
                    Product
                </option>
                <?php
                $pullProducts = $myPDO->query("SELECT * FROM PRODUCTS WHERE CODE >= 1");
                $rows = $pullProducts->fetchAll(PDO::FETCH_ASSOC);
                foreach ($rows as $row) {
                    echo '<option value="' . $row['code'] . '">' . $row['product_name'] . '</option>';
                }
                ?>
            </select>

            <div class="home-inputs">

                <input type="number" name="home-amount" id="home-input-amount" placeholder="Amount">

                <input type="text" name="home-tax" placeholder="Tax" id="home-input-tax" disabled>

                <input type="text" name="home-value" placeholder="Value" id="home-input-unit" disabled>

                <script>
                $(document).ready(function() {
                    $('#home-select-product').change(function() {
                        let product_code = $(this).val();
                        if (product_code) {
                            $.ajax({
                                type: 'GET',
                                url: 'ajaxData.php',
                                data: {
                                    code: product_code
                                },
                                success: function(data) {
                                    let response = JSON.parse(data);
                                    $('#home-input-unit').attr("Value", response.price);
                                    $('#home-input-tax').attr("Value", response.tax);
                                }
                            })
                        } else {
                            alert("Produto não selecionado!");
                            return;
                        }
                    })
                })
                </script>
            </div>

            <input type="submit" name="home-submit" id="home-input-submit" value="Add Product">

            <?php
            if (isset($_GET['home-submit'])) {

                $product_code = $_GET['home-product'];
                $query = $myPDO->query("SELECT product_name FROM PRODUCTS WHERE code = $product_code");
                $resName = $query->fetch(PDO::FETCH_ASSOC);
                $product_name =  $resName['product_name'];
                $amount = $_GET['home-amount'];
                
                $query = $myPDO->query("SELECT TAX FROM PRODUCTS, CATEGORIES WHERE products.category_code = categories.code AND products.code = $product_code");
                $resTax = $query->fetch(PDO::FETCH_ASSOC);
                $tax = $resTax['tax'];

                $query = $myPDO->query("SELECT PRICE FROM PRODUCTS, CATEGORIES WHERE products.category_code = categories.code AND products.code = $product_code");
                $resPrice = $query->fetch(pdo::FETCH_ASSOC);
                $price = $resPrice['price'];

                $totalPriceProduct = $price * $amount;
                $totalPriceCart = $totalPriceProduct;
                $totalTaxCart = $totalPriceCart * ($tax / 100);
                $totalPriceCart += $totalTaxCart;
                

                $query = $myPDO->query("SELECT AMOUNT FROM PRODUCTS WHERE code = $product_code");
                $amountTotal = $query->fetch(PDO::FETCH_ASSOC);

                $query = $myPDO->query("SELECT CART.PRODUCT_NAME FROM CART WHERE cart.product_name = '$product_name'");
                $res_product_name_cart = $query->fetch(PDO::FETCH_ASSOC);

                if($res_product_name_cart !== false) {
                    $product_name_cart = $res_product_name_cart['product_name'];
                }

                if(isset($product_name_cart) && $res_product_name_cart !== false) {
                    if($amount <= $amountTotal['amount'] && $product_name != $product_name_cart) {
                        $query_insert_cart = $myPDO->prepare("INSERT INTO CART VALUES (DEFAULT, :product_name, :amount, :price, :tax, :price_tax, :total)");
                        $query_insert_cart->bindParam(':product_name', $product_name);
                        $query_insert_cart->bindParam(':amount', $amount);
                        $query_insert_cart->bindParam(':price', $price);
                        $query_insert_cart->bindParam(':tax', $tax);
                        $query_insert_cart->bindParam(':price_tax', $totalTaxCart);
                        $query_insert_cart->bindParam(':total', $totalPriceCart);
                        $query_insert_cart->execute();
                    } else {
                        echo  "<script>alert('Não pode adicionar dois produtos iguais!');</script>";
                    }
                } else {
                    if($amount <= $amountTotal['amount']) {
                        $query_insert_cart = $myPDO->prepare("INSERT INTO CART VALUES (DEFAULT, :product_name, :amount, :price, :tax, :price_tax, :total)");
                        $query_insert_cart->bindParam(':product_name', $product_name);
                        $query_insert_cart->bindParam(':amount', $amount);
                        $query_insert_cart->bindParam(':price', $price);
                        $query_insert_cart->bindParam(':tax', $tax);
                        $query_insert_cart->bindParam(':price_tax', $totalTaxCart);
                        $query_insert_cart->bindParam(':total', $totalPriceCart);
                        $query_insert_cart->execute();
                    } else {
                        echo  "<script>alert('Quantidade inserida maior do que no estoque!');</script>";
                    }
                }
            }
            ?>
        </form>

        <div class="linha"></div>

        <form action="" method="POST" class="carrinho">

            <?php 
                if(isset($_POST['cart-cancel'])) {
                    $clearCart = $myPDO->query("DELETE FROM CART");
                    echo  "<script>alert('Carrinho limpo com sucesso!');</script>";
                }
            ?>

            <?php 
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
                
                if(isset($_POST['cart-submit'])) {
                    $query = $myPDO->query("SELECT SUM(price_tax) FROM CART");
                    $res = $query->fetch(PDO::FETCH_DEFAULT);
                    $taxTotal = $res['sum'];

                    $query = $myPDO->query("SELECT SUM(total) FROM CART");
                    $res = $query->fetch(PDO::FETCH_DEFAULT);
                    $total = $res['sum'];
                    
                    $addToOrders = $myPDO->prepare("INSERT INTO ORDERS (CODE, TOTAL, TAX) VALUES (DEFAULT, $total, $taxTotal)");


                    $query = $myPDO->query("SELECT code FROM ORDERS ORDER BY code DESC
                    LIMIT 1");
                    $res = $query->fetch(PDO::FETCH_ASSOC);
                    var_dump(empty($res));
                    error_log(print_r($res, true));
                    if(!empty($res)) {
                        $lastCode = $res['code'];
                    } 
            
                    if(isset($lastCode) !== true) {
                        $addToOrderItem = $myPDO->prepare("INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX)
                        SELECT DISTINCT o.CODE, p.CODE, c.AMOUNT, c.PRICE, c.TAX
                        FROM ORDERS AS o, CART AS c, PRODUCTS as p
                        WHERE o.code = 1 AND p.product_name = c.product_name");
                    } else {
                        $addToOrderItem = $myPDO->prepare("INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX)
                        SELECT DISTINCT o.CODE, p.CODE, c.AMOUNT, c.PRICE, c.TAX
                        FROM ORDERS AS o, CART AS c, PRODUCTS as p
                        WHERE o.code = $lastCode AND p.product_name = c.product_name");
                    }
                    
                    $addToOrders->execute();
                    $addToOrderItem->execute();
                    subtractAmount($myPDO, $lastCode);
                    $clearCart = $myPDO->query("DELETE FROM CART");
                }
            ?>
            <table class="carrinho-table" id="carrinho-table">
                <tbody>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>

                    <?php 
                        $queryTable = $myPDO->query("SELECT PRODUCT_NAME, PRICE, AMOUNT, TOTAL FROM CART");
                        $products = $queryTable->fetchAll(PDO::FETCH_ASSOC);
                        

                        foreach($products as $product) {
                            print_r(
                                "<tr>    
                                    <td>". $product['product_name'] . "</td>
                                    <td> $" . $product['price'] . "</td>
                                    <td>". $product['amount'] ."</td>
                                    <td>$". $product['total'] ."</td>
                                </tr>"
                            );
                        }
                    ?>
                </tbody>
            </table>

            <?php 
                $queryTax = $myPDO->query("SELECT SUM(PRICE_TAX) FROM CART");
                $resTax = $queryTax->fetch(PDO::FETCH_ASSOC);
                $price_tax = $resTax['sum'];

                $queryTotal = $myPDO->query("SELECT SUM(TOTAL) FROM CART");
                $resTotal = $queryTotal->fetch(PDO::FETCH_ASSOC);
                $price_total = $resTotal['sum'];
            ?>
            <div class="total-tax">
                <div class="carrinho-tax">
                    <label for="carrinho-tax">Tax: </label>
                    <input type="text" name="cart-tax" value="<?php echo '$'.$price_tax ?>" id="carrinho-tax" disabled value="">
                </div>

                <div class="carrinho-total">
                    <label for="carrinho-total">Total: </label>
                    <input type="text" name="cart-total" id="carrinho-total" disabled value="<?php echo '$'.$price_total ?>">
                </div>
            </div>

            <div class="carrinho-cancel-finish">
                

                <input type="submit" name="cart-cancel" id="carrinho-cancel" value="Cancel">

                <input type="submit" name="cart-submit" id="carrinho-finish" value="Finish" >
            </div>
        </form>
    </main>
</body>
</html>