<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/history.css">
    <title>History</title>
</head>
<body>
    <?php 
        include_once './partials/header-nav.php';
        include_once './index.php';   
    ?>

    <main>

        <form action="" class="carrinhoTable">
            <table id="carrinho-table">
                <tr>
                    <th>Code</th>
                    <th>Tax</th>
                    <th>Total</th>
                </tr>

                <?php 
                    $queryTable = $myPDO->query("SELECT CODE, TAX, TOTAL FROM ORDERS");
                    $history = $queryTable->fetchAll(PDO::FETCH_ASSOC);
                    

                    foreach($history as $orders) {
                        print_r(
                            "<tr>    
                                <td>". $orders['code'] . "</td>
                                <td> $" . $orders['tax'] . "</td>
                                <td> $". $orders['total'] ."</td>
                            </tr>"
                        );
                    }
                ?>
            </table>
        </form>

        <div class="linha"></div>

        <form action="./history.php" method="POST" class="carrinhoDetails">
            <select name="order-select" id="details" place>
                <option value="" disabled data-default="" selected>Select purchase code</option>
                <?php
                    $pullOrders = $myPDO->query("SELECT code FROM orders WHERE CODE >= 1");
                    $rows = $pullOrders->fetchAll(PDO::FETCH_ASSOC);
                    foreach($rows as $row) {
                        print_r("<option>" .$row['code']."</option>");
                    }
                ?>
            </select>

            <input type="submit" name="submit-order-selected" value="Enviar" id="details">

            <?php 
                if(isset($_POST['submit-order-selected'])) {
                    if(empty($orderSelected)) {
                        $orderSelected = $_POST['order-select'];
                    } else {
                        echo  "<script>alert('Insira um codigo de compra!');</script>";
                    }
                }
            ?>

            <table id="carrinho-details">
                <tr>
                    <th>Product</th>
                    <th>Unit price</th>
                    <th>Amount</th>
                    <th>Tax</th>
                    <th>Total</th>
                </tr>

                

                <?php 

                    if(!empty($orderSelected)) {
                        $queryTable = $myPDO->query("SELECT p.product_name, p.price, o.amount, o.tax, o.price FROM PRODUCTS as p, ORDER_ITEM as o, ORDERS WHERE p.code = o.code AND orders.code = $orderSelected");
                        $details = $queryTable->fetchAll(PDO::FETCH_ASSOC);

                        foreach($details as $detail) {
                            print_r(
                                "<tr>    
                                    <td>". $detail['product_name'] . "</td>
                                    <td> $" . $detail['price'] . "</td>
                                    <td> $". $detail['amount'] ."</td>
                                    <td> $". $detail['tax'] ."</td>
                                    <td> $". $detail['price'] ."</td>
                                </tr>"
                            );
                        }
                    }
                ?>
            </table>
        </form>
    </main>
</body>
</html>