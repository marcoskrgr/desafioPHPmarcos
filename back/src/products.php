<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/products.css">

    <title>Products</title>
</head>
<body>
    <?php 
        include_once './partials/header-nav.php';
        include_once './index.php';   
    ?>

    <main>
        <form action="./products.php" method="GET" class="product">

            <div class="product-inputs">
                <input type="text" name="product-name" id="product-product" placeholder="Product">

                <input type="number" name="product-amount" id="product-amount" placeholder="Amount">

                <input type="text" name="product-unitPrice" id="product-unit" placeholder="Unit price">
            </div>

            <select name="product-category" id="product-category">
                <option value="" data-default="" disabled selected>Category</option>
                <?php 
                    $pullCategories = $myPDO->query("SELECT CATEGORY_NAME FROM CATEGORIES WHERE CODE >= 1");
                    $rows = $pullCategories->fetchAll(PDO::FETCH_ASSOC);
                    foreach($rows as $row) {
                        print_r("<option>" .$row['category_name']."</option>");
                    }
                ?>
            </select>
            
            <input type="submit" name="product-submit" id="product-add" value="Add Product">

            <?php 
                if(isset($_GET['product-submit'])) {
                    
                    $categoryName = $_GET['product-category'];

                    $query_category_code = "SELECT CODE FROM CATEGORIES WHERE CATEGORY_NAME = :categoryName";
                    $stmt_category_code = $myPDO->prepare($query_category_code);
                    $stmt_category_code->bindParam(':categoryName', $categoryName, PDO::PARAM_STR);
                    $stmt_category_code->execute();

                    if ($row = $stmt_category_code->fetch(PDO::FETCH_ASSOC)) {
                        $categoryCode = $row['code'];

                        $productName = $_GET['product-name'];
                        $amount = $_GET['product-amount'];
                        $unitPrice = $_GET['product-unitPrice'];

                        $product = new Product($productName, $amount, $unitPrice, $categoryName);

                        $query_insert_product = "INSERT INTO PRODUCTS VALUES (DEFAULT, :product_name, :amount, :price, :category_code)";
                        $stmt_insert_product = $myPDO->prepare($query_insert_product);
                        $stmt_insert_product->bindParam(':product_name', $productName, PDO::PARAM_STR);
                        $stmt_insert_product->bindParam(':amount', $amount, PDO::PARAM_INT);
                        $stmt_insert_product->bindParam(':price', $unitPrice, PDO::PARAM_INT);
                        $stmt_insert_product->bindParam(':category_code', $categoryCode, PDO::PARAM_INT);
                        $stmt_insert_product->execute();
                } else {
                    echo '<script>alert("Categoria não encontrada!")</script>'; 
                }
            }
            ?>

        </form>

        <div class="linha"></div>

        <form action="" class="carrinho">
            <table id="carrinho-table">
                <tr>
                    <th id="code">Code</th>
                    <th id="product">Product</th>
                    <th id="amount">Amount</th>
                    <th id="unit">Unit price</th>
                    <th id="category">Category</th>
                </tr>

                <?php 
                    $queryTable = "SELECT p.CODE, p.PRODUCT_NAME, p.AMOUNT, p.PRICE, c.CATEGORY_NAME FROM PRODUCTS AS p, CATEGORIES AS c WHERE c.CODE = p.CATEGORY_CODE";
                    $stmt_category_name = $myPDO->prepare($queryTable);
                    $stmt_category_name->execute();
                    
                    $products = $stmt_category_name->fetchAll(PDO::FETCH_ASSOC);

                    foreach ($products as $product) {
                        print_r(
                            "<tr>    
                                <td>". $product['code'] . "</td>
                                <td> " . $product['product_name'] . "</td>
                                <td>". $product['amount'] ."</td>
                                <td>$". $product['price'] ."</td>
                                <td>". $product['category_name'] ."</td>
                            </tr>"
                        );
                    }
                ?>
            </table>
    </main>
</body>
</html>