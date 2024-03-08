const formHome = document.querySelector("form.home");
formHome.addEventListener('submit', executaAddProduct);

const productSelected = document.querySelector("#home-select-product");
const productDefault = productSelected.querySelector("#default")
const amountSelected = document.querySelector("#home-input-amount");
const taxAmount = document.querySelector("#home-input-tax");
const unitAmount = document.querySelector("#home-input-unit");
const tableCarrinho = document.querySelector("#carrinho-table");
const tbodyCarrinho = tableCarrinho.querySelector('tbody');
const taxCarrinho = document.querySelector("#carrinho-tax");
const totalValueAmount = document.querySelector("#carrinho-total");


let productDetail = [];
let ids = [];
let arrHome = JSON.parse(localStorage.getItem('home')) || [];
let arrHomeObj = [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let arrHistory = JSON.parse(localStorage.getItem('history')) || [];
let arrPurchaseShow = JSON.parse(localStorage.getItem('purchase')) || [];
let unitPriceProduct = null;
let totalValue = null;
let totalValueTax = null;

if(arrHistory.length != 0) {
    var showCode = arrHistory[arrHistory.length - 1].code;
} else {
    showCode = 1;
}

let enable = false;

// function deleteRow () {

// }

function addButtonDelete () {
    let qntLinhas = tableCarrinho.rows;
    

    for(x = 0; x < qntLinhas.length; x++) {
        let cols = qntLinhas[x].cells;
        let lastCol = rows[x]['cells'][cols.length - 1];


        let btn = document.createElement('button');
        btn.innerText = "Delete";
        btn.className = "btnDelete";
        btn.onclick()

        
    }
}

function executaAddProduct (e) {
    e.preventDefault();
}

productSelected.addEventListener('change', handleProductChange);

function clearTable() {
    let table = document.querySelector("#carrinho-table");

    table.innerHTML = `
    <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Total</th>
    </tr>
    `
    localStorage.removeItem('home');
    localStorage.removeItem('totalValue');
    localStorage.removeItem('totalTax');
    totalValueAmount.value = "";
    taxCarrinho.value = "";
    productSelected.value = "";
    amountSelected.value = "";
    arrHome = [];
}

function finishStore (){

    let tableRows = tableCarrinho.querySelectorAll("tr");
    if(tableRows.length === 1 || enable === false) {
        alert("Nao há itens no carrinho!");
        return;
    } else if (enable === false) {
        alert("Itens com quantidade maior do que no estoque!");
        return;
    }  else {
        subtractAmountProduct();
        window.alert("Finalizado!");
        if(arrHome) {
            if(arrHistory.length != 0) {
                let code = 1;
                code += arrHistory[arrHistory.length - 1].code;
    
                const historyObj = {
                    code: code,
                    tax: taxCarrinho.value,
                    total: totalValueAmount.value
                }
    
    
                arrHistory.push(historyObj);
                localStorage.setItem('history', JSON.stringify(arrHistory));    
                clearTable();
                totalValueAmount.value = "$0";
                taxCarrinho.value = "$0";
            } else {
                let code = 1;
    
                const historyObj = {
                    code: code,
                    tax: taxCarrinho.value,
                    total: totalValueAmount.value
                }
        
                arrHistory.push(historyObj);
                localStorage.setItem('history', JSON.stringify(arrHistory));
                clearTable();
                totalValueAmount.value = "$0";
                taxCarrinho.value = "$0";
            }
        }
    clearTable();
    showCode++;
    }
}

function handleProductChange() {
    const selectedCategoryName = productSelected.value;
    const selectedProduct = products.find(product => product.product === selectedCategoryName);

    if (selectedProduct) {
        const selectedProductUnit = products.find(unit => unit.unit === selectedProduct.unit);
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        const selectedCategory = categories.find(category => category.category === selectedProduct.category);
    
        if (selectedCategory && selectedProductUnit) {
            taxAmount.value = selectedCategory.tax;
            unitAmount.value = selectedProductUnit.unit;
            unitPriceProduct = parseInt(unitAmount.value);
        } else {
            return;
        }
    } else {
        return;
    }
}

const createCells = () => {

    let qntLinhas = tableCarrinho.rows.length;
    let linha = tableCarrinho.insertRow(qntLinhas);

    linha.uniqueID = codeProd;
    linha.id = linha.uniqueID;

    for(x = 0; x < productDetail.length; x++) {
        let celula = linha.insertCell(x);

        celula.uniqueID = ids[x] + codeProd;
        celula.id = celula.uniqueID;
        celula.innerText = productDetail[x];
    }
}

let createCellsAgain = () => {

    for(x = 0; x < arrHomeObj.length; x++) {

        const row = document.createElement("tr");
        row.setAttribute("id", x);
    
        let objValue = Object.values(arrHomeObj[x]);

        for(i = 0; i < objValue.length; i++) {
            const cell = document.createElement("td");
            ids = [
                "product",
                "price",
                "amount",
                "total"
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

const showHome = () => {

    const products = localStorage.getItem('products');

    function loadHome () {
        let productsLoaded = JSON.parse(products);

        productsLoaded.forEach(product => {
            const option = document.createElement('option');
            option.value = product.product;
            option.text = product.product;
            productSelected.add(option);
        })
    }
    
    arrProductsObj = JSON.parse(localStorage.getItem('products'));
    arrHomeObj = JSON.parse(localStorage.getItem('home'));
    let sum = localStorage.getItem('totalValue');
    let sumTax = localStorage.getItem('totalTax');

    if(arrProductsObj) {
        codeProd = localStorage.getItem('codesProd');
        loadHome();
        if(arrHomeObj){
            createCellsAgain();
            if(sum) {
                totalValueAmount.value += "$" + (Number(sum) + Number(sumTax));
                taxCarrinho.value += "$" + Number(sumTax);
            } else {
                totalValueAmount.value = "$" + (Number(sum) + Number(sumTax));
                taxCarrinho.value += "$" + Number(sumTax);
            }
        } else {
            return;
        }
    } 
} 

formHome.addEventListener("change", () => validarHome(productSelected, amountSelected));
formHome.addEventListener("input", () => validarHome(productSelected, amountSelected));

function validarHome(product, amount) {
    const homeAmountValue = parseFloat(amount.value.trim());
    const productString = String(product.value);

    const errors = {
        product: "",
        amount: ""
    };

    if (productString === "") {
        errors.product = 1;
    } 

    if (isNaN(homeAmountValue) || homeAmountValue <= 0) {
        errors.amount = 1;
    } else {
        const availableQuantity = getAvailableQuantity(productString);
        if (homeAmountValue > availableQuantity) {
        errors.amount = 1;
        enable = false;
        } else {
            enable = true;
        }
    }

    const submitButton = formHome.querySelector("#home-input-submit");
    submitButton.disabled = Object.values(errors).some((error) => error !== "");

    return errors;
}

function getAvailableQuantity(productName) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((product) => product.product === productName);
    return product ? product.amount || 0 : 0; 
}

function subtractAmountProduct () {
    let retirevedCart = JSON.parse(localStorage.getItem('home')) || [];
    let retirevedProducts = JSON.parse(localStorage.getItem('products'));
    for(i = 0; i < retirevedProducts.length; i++){
        for(j = 0; j < retirevedCart.length; j++){
            if(retirevedProducts[i].product === retirevedCart[j].product){
                retirevedProducts[i].amount -= retirevedCart[j].amount;
            }
        }
    }
    localStorage.setItem('products', JSON.stringify(retirevedProducts));
}



function insereProductTable () { 

    let retirevedCart = JSON.parse(localStorage.getItem('home')) || [];
    let retirevedProducts = JSON.parse(localStorage.getItem('products'));
    let availableQuantity = retirevedProducts.filter((item) => item.product === productSelected.value);
    
    if(productSelected.value === "") {
        alert("Adicione algum produto!");
    } else if((retirevedCart.find((product) => product.product === productSelected.value))) {
        alert("Item já está tabela!");
    } else if (amountSelected.value > Number(availableQuantity[0].amount)) {
        alert("Quantidade selecionada maior do que no estoque!");
    } else {
        let productUnit = parseFloat(unitPriceProduct);
    
        totalValue = parseFloat(productUnit * amountSelected.value);
        totalValueTax = parseFloat(productUnit * amountSelected.value * (taxAmount.value / 100))

        productDetail = [
            productSelected.value,
            "$" + productUnit,
            amountSelected.value,
            "$" + totalValue
        ];

        ids = [
            "product",
            "price",
            "amount",
            "total"
        ]

        createCells();

        const homeObj = {
            product: productSelected.value,
            unit: `$${productUnit}`,
            amount: amountSelected.value,
            price: `$${totalValue}`
        }

        arrHome.push(homeObj);
        console.log(arrHome);
        localStorage.setItem('home', JSON.stringify(arrHome));

        const purchaseShowObj = {
            code: showCode,
            product: productSelected.value,
            unit: `$${productUnit}`,
            amount: amountSelected.value,
            tax: `%${taxAmount.value}`,
            price: `$${totalValue + (totalValue * (Number(taxAmount.value)/100))}`
        }

        arrPurchaseShow.push(purchaseShowObj);
        localStorage.setItem('purchase', JSON.stringify(arrPurchaseShow));

        productSelected.value = "";
        amountSelected.value = "";
        taxAmount.value = "Tax";
        unitAmount.value = "Value";
        
        let sum = Number(localStorage.getItem('totalValue'));
        let sumTax = Number(localStorage.getItem('totalTax'));

        if(sum) {
            totalValueAmount.value = "$" + sum;
            taxCarrinho.value = "$" + sumTax;
        } else {
            totalValueAmount.value = "$" + sum;
        }

        sumTax += totalValueTax;
        sum += totalValue;
        totalValueAmount.value = "$" + (Number(sum) + Number(sumTax));
        taxCarrinho.value = "$" + sumTax;

        localStorage.setItem('totalValue', sum);
        localStorage.setItem('totalTax', sumTax);

        validarHome(productSelected, amountSelected);
    }

}

window.onload = showHome(), validarHome(productSelected, amountSelected);