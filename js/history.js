const tableCarrinho = document.querySelector("#carrinho-table");
const tbodyCarrinho = tableCarrinho.querySelector('tbody');
const categoryName = document.querySelector("#category-name");
const categoryTax = document.querySelector("#category-tax");
const formCategory = document.querySelector("form");
const purchaseCode = document.querySelector("#details");
const tableDetails = document.querySelector("#carrinho-details");
const tbodyDetails = tableDetails.querySelector('tbody');

let arrHistory = JSON.parse(localStorage.getItem('history')) || [];
let categoryDetail = [];
let ids = [];
const codes = localStorage.getItem('history');
let arrPurchaseShow = JSON.parse(localStorage.getItem('purchase'));

let codeCat = 1;

purchaseCode.addEventListener('change', handlePurchaseChange);

function handlePurchaseChange () {
    clearTable();
    const selectedPurchaseCode = purchaseCode.value;

    let purchaseCodePair = arrPurchaseShow.filter(code => code.code == selectedPurchaseCode);


    for(x = 0; x < purchaseCodePair.length; x++) {

        const row = document.createElement("tr");
        row.setAttribute("id", x);

        let teste = Object.values(purchaseCodePair[x]);

        for(i = 0; i < teste.length - 1; i++) {
            const cell = document.createElement("td");
            const nodeText = document.createTextNode(teste[i + 1]);
            cell.setAttribute("id", x);
            cell.appendChild(nodeText);
            row.appendChild(cell);
        }

        tbodyDetails.appendChild(row);
        tableDetails.appendChild(tbodyDetails);
    }
}

function clearTable() {
    tbodyDetails.innerHTML = `
    <tr>
        <th>Product</th>
        <th>Unit price</th>
        <th>Amount</th>
        <th>Tax</th>
        <th>Total</th>
    </tr>
    `
}

let createCellsAgain = () => {

    for(x = 0; x < arrHistory.length; x++) {

        const row = document.createElement("tr");
        row.setAttribute("id", x);
    
        let objValue = Object.values(arrHistory[x]);
    

        for(i = 0; i < objValue.length; i++) {
            const cell = document.createElement("td");
            ids = [
                "code",
                "tax",
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

const showHistory = () => {

    function loadCodes () {
        let codesLoaded = JSON.parse(codes);
        codesLoaded.forEach(code => {
            const option = document.createElement('option');
            option.value = code.code;
            option.text = code.code;
            purchaseCode.add(option);
        })
    }
    
    arrHistory = JSON.parse(localStorage.getItem('history'));

    if(arrHistory) {
        codeCat = localStorage.getItem('codesCat');
        loadCodes();
        createCellsAgain();
    } 
}  

window.onload = showHistory();