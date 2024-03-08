const tableCarrinho = document.querySelector("#carrinho-table");
const tbodyCarrinho = tableCarrinho.querySelector('tbody');
const categoryName = document.querySelector("#category-name");
const categoryTax = document.querySelector("#category-tax");
const formCategory = document.querySelector("form");

let categoryDetail = [];
let ids = [];
let arrCategories = JSON.parse(localStorage.getItem('categories')) || [];
let arrHistory = [];

let codeCat = 1;

categoryName.addEventListener("input", () => validarCategory(categoryName, categoryTax));
categoryTax.addEventListener("input", () => validarCategory(categoryName,categoryTax));

const createCells = () => {
    let qntLinhas = tableCarrinho.rows.length;
    let linha = tableCarrinho.insertRow(qntLinhas);

    linha.uniqueID = codeCat;
    linha.id = linha.uniqueID;

    for(x = 0; x < categoryDetail.length; x++) {
        let celula = linha.insertCell(x);

        celula.uniqueID = ids[x] + codeCat;
        celula.id = celula.uniqueID;
        celula.innerText = htmlEncode(categoryDetail[x]);

        
    }
}

let createCellsAgain = () => {

    for(x = 0; x < arrHistory.length; x++) {

        const row = document.createElement("tr");
        row.setAttribute("id", x);
    
        let objValue = Object.values(arrHistory[x]);
    

        for(i = 0; i < objValue.length; i++) {
            const cell = document.createElement("td");
            ids = [
                "codeCat",
                "category",
                "tax"
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

const showCategories = () => {
    
    arrHistory = JSON.parse(localStorage.getItem('categories'));

    if(arrHistory) {
        codeCat = localStorage.getItem('codesCat');
        createCellsAgain();
    } 
}  

function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
}

function validarCategory(category, tax) {

    const categoryNameValue = category.value.trim();
    const categoryTaxValue = parseFloat(tax.value.trim());

    let teste = 0;
    if(arrCategories.find(cat => cat.category === categoryNameValue)) {
        return teste;
    };

    const errors = {
        categoryName: "",
        categoryTax: ""
    };

    if (categoryNameValue === "" || category.placeholder === category || Object.keys(teste).length > 0) {
        errors.categoryName = 1;
    } else if (!/^[A-Za-z_]+$/.test(categoryNameValue)) {
        errors.categoryName = 1;
    }
        
    if (isNaN(categoryTaxValue) || categoryTaxValue <= 0 || categoryTaxValue > 100) {
        errors.categoryTax = 1;
    }

    categoryName.textContent = errors.categoryName;
    categoryTax.textContent = errors.categoryTax;

    valid = category.textContent === "" && tax.textContent === "";

    formCategory.querySelector("#category-add").disabled = !valid;
}

function insereProductTable () {

    categoryDetail = [
        codeCat,
        categoryName.value,
        categoryTax.value,
    ];

    ids = [
        "codeCat",
        "category",
        "tax"
    ]

    createCells();

    console.log(`
        Code: ${codeCat},
        Category: ${categoryName.value},
        Tax: %${categoryTax.value},
    `);
    
    const catObj = {
        codeCat : `${codeCat}`,
        category : `${categoryName.value}`,
        tax : `${categoryTax.value}`
    }

    arrCategories.push(catObj);

    localStorage.setItem('categories', JSON.stringify(arrCategories));
    
    categoryName.value = "";
    categoryTax.value = "";

    codeCat++;   

    localStorage.setItem('codesCat', codeCat);
    validarCategory(categoryName, categoryTax);
}

window.onload = showCategories(), validarCategory(categoryName, categoryTax);