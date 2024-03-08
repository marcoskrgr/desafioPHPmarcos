const tableCarrinho = document.querySelector("#carrinho-table");
const tbodyCarrinho = tableCarrinho.querySelector('tbody');
const formProduct = document.querySelector("form");
const productSelected = document.querySelector("#product-product");
const amountSelected = document.querySelector("#product-amount");
const unitSelected = document.querySelector("#product-unit");
const categorySelected = document.querySelector("#product-category");

let productDetail = [];
let ids = [];
let arrProducts = JSON.parse(localStorage.getItem('products')) || [];
let arrProductsObj = [];
const categories = localStorage.getItem('categories');

let codeProd = 1;

function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
}

const createCells = () => {
    let qntLinhas = tableCarrinho.rows.length;
    let linha = tableCarrinho.insertRow(qntLinhas);

    linha.uniqueID = codeProd;
    linha.id = linha.uniqueID;

    for(x = 0; x < categoryDetail.length; x++) {
        let celula = linha.insertCell(x);

        celula.uniqueID = ids[x] + codeProd;
        celula.id = celula.uniqueID;
        celula.innerText = htmlEncode(categoryDetail[x]);
    }
}

let createCellsAgain = () => {

    for(x = 0; x < arrProductsObj.length; x++) {

        const row = document.createElement("tr");
        row.setAttribute("id", x);
    
        let objValue = Object.values(arrProductsObj[x]);
    

        for(i = 0; i < objValue.length; i++) {
            const cell = document.createElement("td");
            ids = [
                "code",
                "product",
                "amount",
                "unitPrice",
                "category"
            ]
            const nodeText = document.createTextNode(objValue[i]);
            cell.setAttribute("id", ids[i] + x);
            cell.appendChild(nodeText);
            row.appendChild(cell);
        }

        tbodyCarrinho.appendChild(row);
        tableCarrinho.appendChild(tbodyCarrinho);
    }
}

const showProducts = () => {

    function loadCategories () {
        let categoriesLoaded = JSON.parse(categories);
        categoriesLoaded.forEach(category => {
            const option = document.createElement('option');
            option.value = category.category;
            option.text = category.category;
            categorySelected.add(option);
        })
    }

    if(categories) {

        arrProductsObj = JSON.parse(localStorage.getItem('products'));
        loadCategories();

        if(arrProductsObj) {
            codeProd = localStorage.getItem('codesProd');
            createCellsAgain();
        } else {
            return;
        }
    }    
}  

productSelected.addEventListener("input", () => validarProduct(productSelected, amountSelected, unitSelected, categorySelected));
amountSelected.addEventListener("input", () => validarProduct(productSelected, amountSelected, unitSelected, categorySelected));
unitSelected.addEventListener("input", () => validarProduct(productSelected, amountSelected, unitSelected, categorySelected));
categorySelected.addEventListener("change", () => validarProduct(productSelected, amountSelected, unitSelected, categorySelected));

function validarProduct(product, amount, price, category) {
    const productNameValue = product.value.trim();
    const productAmountValue = parseFloat(amount.value.trim());
    const productPriceValue = parseFloat(price.value.trim());
    const categoryString = String(category.value);

    const errors = {
        productName: "",
        amount: "",
        price: "",
        category: ""
    };

    if (productNameValue === "" || product.placeholder === product) {
        errors.productName = 1;
    } else if (!/^[A-Za-z_]+$/.test(productNameValue)) {
        errors.productName = 1;
    }
        
    if (isNaN(productAmountValue) || productAmountValue < 0) {
        errors.amount = 1;
    }

    if (isNaN(productPriceValue) || productPriceValue < 0) {
        errors.price = 1;
    }

    if (categoryString === "") {
        errors.category = 1;
    }

    if (errors.productName === "" && errors.amount === "" && errors.price === "" && errors.category === "") {
        formProduct.querySelector("#product-add").disabled = 0;
    } else {
        formProduct.querySelector("#product-add").disabled = 1;
    }
}

function insereProductTable () {

    let retirevedCart = [];
    if (localStorage.getItem('products')) {
        retirevedCart = JSON.parse(localStorage.getItem('products'));
    }

    if(productSelected.value === "") {
        alert("Adicione algum produto!");
    } else if((retirevedCart.find((product) => product.product === productSelected.value))) {
        alert("Item já está tabela!");
    } else {
        categoryDetail = [
            codeProd,
            productSelected.value,
            amountSelected.value,
            unitSelected.value,
            categorySelected.value
        ];
    
        ids = [
            "code",
            "product",
            "amount",
            "unitPrice",
            "category"
        ]
    
        createCells();
    
        console.log(
            `
            Code: ${codeProd},
            Product: ${productSelected.value},
            Amount: ${amountSelected.value},
            Unit price: $${unitSelected.value}
            Category: ${categorySelected.value}`
        );
    
        const prodObj = {
            code : codeProd,
            product : productSelected.value,
            amount : amountSelected.value,
            unit : unitSelected.value,
            category : categorySelected.value   
        }
    
        arrProducts.push(prodObj);
    
        localStorage.setItem('products', JSON.stringify(arrProducts));
    
        productSelected.value = "";
        amountSelected.value = "";
        categorySelected.value = "";
        unitSelected.value = "";
    
        codeProd++;
    
        localStorage.setItem('codesProd', codeProd);
        validarProduct(productSelected, amountSelected, unitSelected, categorySelected);
    }
}


window.onload = showProducts(), validarProduct(productSelected, amountSelected, unitSelected, categorySelected);