
<?php

$host = "pgsql_desafio";
$db = "applicationphp";
$user = "root";
$pw = "root";

$myPDO = new PDO("pgsql:host=$host;dbname=$db", $user, $pw);

$uri = $_SERVER['REQUEST_URI'];
$dir = '/';
 
switch ($uri) {
    case '':
    case '/':
        require __DIR__ . $dir . 'home.php';
        break;
 
    case '/products':
        require __DIR__ . $dir . 'products.php';
        break;
 
    case '/categories':
        require __DIR__ . $dir . 'categories.php';
        break;
 
    case '/history':
        require __DIR__ . $dir . 'history.php';
        break;
}

class Category {

    protected $categoryName = null;
    protected $tax = null;

    public function __construct($categoryName, $tax)
    {
        $this->categoryName = $categoryName;
        $this->tax = $tax;
    }
}

class Product extends Category{

    protected $productName = null;
    protected $amount = null;
    protected $unitPrice = null;
    protected $categoryProduct = null;

    public function __construct($productName, $amount, $unitPrice, $categoryName)
    {
        $this->productName = $productName;
        $this->amount = $amount;
        $this->unitPrice = $unitPrice;
        $this->categoryProduct = $categoryName;
    }
}

class Cart extends Product{
    
}

// // exemplo de insert
// $statement = $myPDO->prepare("INSERT INTO mytable (DESCRIPTION) VALUES ('TEST PHP')");
// $statement->execute();

// // exemplo de fetch
// $statement1 = $myPDO->query("SELECT * FROM mytable");
// $data = $statement1->fetch();

// echo "<br>";
// print_r($data);

// // exemplo de fetch2
// $statement2 = $myPDO->query("SELECT * FROM mytable");
// $data2 = $statement2->fetchALL();

// echo "<br>";
// print_r($data2);