<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/categories.css">
    <title>Categories</title>
</head>
<body>
    <?php 
        include_once './partials/header-nav.php'; 
        include_once './index.php'; 
    ?>
    

    <main>
        <form action="./categories.php" method="GET" class="category" id="category">
            <div class="category-inputs">
                <input type="text" name="category-name" id="category-name" placeholder="Category" required>

                <input type="number" name="category-tax" id="category-tax" placeholder="%" required>
            </div> 

            <input type="submit" name="category-submit" value="Add Category" id="category-add">

        <?php 

            if(isset($_GET['category-submit'])) {
    
                $categoryName = $_GET['category-name'];
                $tax = $_GET['category-tax'];
                
                $category = new Category($categoryName, $tax);
    
                $result = $myPDO->prepare("INSERT INTO CATEGORIES 
                    VALUES (DEFAULT, :categoryName, :tax)");
                $result->bindParam(':categoryName', $categoryName);
                $result->bindParam(':tax', $tax);
                $result->execute();
            }
        ?>
        </form>
        
        <div class="linha"></div>

        <form action="" method="$_GET" class="carrinho">
            <table id="carrinho-table">
                <tr>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Tax</th>
                </tr>

                <?php
                    $queryTable = $myPDO->query("SELECT * FROM CATEGORIES");
                    $categories = $queryTable->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($categories as $category) {
                    print_r(
                        "<tr>    
                            <td>". $category['code'] . "</td>
                            <td> " . $category['category_name'] . "</td>
                            <td>". $category['tax'] ."%</td>
                        </tr>");
                    }
                ?>
            </table>
        </form>
    </main>
</body>
</html>
