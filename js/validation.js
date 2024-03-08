// const regexLetter = /[A-Za-z_]+$/g;
// const regexNumber = /\d/g;
// const regexPepo = /\W/g;

// var valid = Boolean;

// function validarHome() {

//     valid = false;
//     if(productSelected.value == ""|| 
//         amountSelected.value <= 0 || 
//         amountSelected.value === "" ||
//         amountSelected.value <= 0) {
//         console.log("faltou algo"); 
//         valid = false;
//     } else {
//         console.log("validou");
//         valid = true;
//     }
// }

// function validarProduct() {

//     valid = false;
    
//     let letter = regexLetter.test(productSelected.value);

//     if(productSelected.value == "" ||
//         letter == false ||  
//         amountSelected.value <= 0 ||
//         amountSelected.value == "" || 
//         unitSelected.value <= 0 || 
//         unitSelected.value == "" || 
//         categorySelected.value == "" 

//         ) {
//         console.log("faltou algo");
//         valid = false;
//     } else {
        
//         console.log("validou");
//         valid = true;
//     }
// }

// function validarCategory () {

//     valid = false;

//     let letter = regexLetter.test(categoryName.value);

//     if (categoryName.value == "" ||
//         letter == false ||
//         categoryTax.value < 0 
//     ) { 
//         console.log("faltou algo");
//         valid = false;
//     } else {
//         console.log(letter);
//         console.log("passou");
//         valid = true;
//     }
// }

// const regexLetter = /[A-Za-z_]+$/g;
// const regexNumber = /\d/g;
// const regexPepo = /[^a-zA-Z0-9_]/g;

// var valid = false;

// function escapeHtml(unsafeString) {
//   const map = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&apos;',
//   };
//   const replaceFn = (s) => map[s];
//   return unsafeString.replace(/[&<>"']/g, replaceFn);
// }

// function validarHome() {
//   valid = false;

//   if (productSelected.value.trim() === "" ||
//       amountSelected.value <= 0 ||
//       amountSelected.value.trim() === "" ||
//       unitSelected.value <= 0 ||
//       unitSelected.value.trim() === "" ||
//       categorySelected.value.trim() === "") {
//     console.log("Faltou algo");
//     valid = false;
//   } else {
//     console.log("Validou");
//     valid = true;
//   }
// }

// function validarProduct() {
//   valid = false;

//   const productValue = productSelected.value.trim();
//   let letter = regexLetter.test(productValue.replace(regexPepo, "")); // Sanitize before testing

//   if (productValue === "" ||
//       !letter ||
//       amountSelected.value <= 0 ||
//       amountSelected.value.trim() === "" ||
//       unitSelected.value <= 0 ||
//       unitSelected.value.trim() === "" ||
//       categorySelected.value.trim() === "") {
//     console.log("Faltou algo");
//     valid = false;
//   } else {
//     console.log("Validou");
//     valid = true;
//   }
// }

// function validarCategory() {
//   valid = false;

//   const categoryValue = categoryName.value.trim();
//   let letter = regexLetter.test(categoryValue.replace(regexPepo, "")); // Sanitize before testing

//   if (categoryValue === "" ||
//       !letter ||
//       categoryTax.value < 0) {
//     console.log("Faltou algo");
//     valid = false;
//   } else {
//     console.log(letter); // Sanitizing before printing is debatable; see Security Considerations
//     console.log("Passou");
//     valid = true;
//   }
// }